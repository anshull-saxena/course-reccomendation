import React, { useState,useEffect } from 'react';
import { StyleSheet, Text, View, TextInput, Button, ScrollView, Alert, TouchableOpacity,FlatList,ActivityIndicator  } from 'react-native';
import { KeyboardAvoidingView, Platform } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { StatusBar } from 'expo-status-bar';
import axios from 'axios';
const subjects = [
  "ENGINEERING GRAPHICS",
  "COMPUTER PROGRAMMING",
  "GENERAL BIOLOGY",
  "BIOLOGY LABORATORY",
  "TECHNICAL REPORT WRITING",
  "THERMODYNAMICS",
  "WORKSHOP PRACTICE",
  "CHEMISTRY LABORATORY",
  "PHYSICS LABORATORY",
  "GENERAL CHEMISTRY",
  "MATHEMATICS I",
  "PROBABILITY & STATISTICS",
  "ENVIRONMENTAL STUDIES",
  "PRACTICE SCHOOL I",
  "MECH OSCILLATIONS & WAVE",
  "ELECTRICAL SCIENCES",
  "MATHEMATICS II",
  "MATHEMATICS III",
  "PRACTICE SCHOOL II",
  "PRINCIPLES OF ECONOMICS",
  "DIGITAL DESIGN",
  "MICROPROC & INTERFACING",
  "OBJECT ORIENTED PROG",
  "OPERATING SYSTEMS",
  "FUNDA OF FIN AND ACCOUNT",
  "CONTROL SYSTEMS",
  "ELECTRONIC DEVICES",
  "SIGNALS & SYSTEMS",
  "ANALOG ELECTRONICS",
  "MICROELECTRONIC CIRCUITS",
  "ELECTRICAL MACHINES",
  "STUDY PROJECT",
  "DERIVATIVES & RISK MGMT",
  "SECUR ANAL & PORTFOL MGT",
  "FLUID MECHANICS",
  "DESIGN PROJECT",
  "DATA STRUCTURES & ALGO",
  "FINANCIAL MANAGEMENT",
  "BUSS ANAL & VALUATION",
  "COMPUTER ARCHITECTURE",
  "COMMUNICATION SYSTEMS",
  "CRYPTOGRAPHY",
  "LOGIC IN COMPUTER SC",
  "LABORATORY PROJECT",
  "MECHANICS OF SOLIDS",
  "INTERNET OF THINGS",
  "PRINCIPLES OF MANAGEMENT",
  "HEAT TRANSFER",
  "DISASTER AND DEVELOPMENT",
  "DATABASE SYSTEMS",
  "ANALOG & DIGIT VLSI DES",
  "PRINCIPLES OF PROGG LANG",
  "COMPILER CONSTRUCTION",
  "COMPUTER NETWORKS",
  "DESIGN & ANAL OF ALGO",
  "THEORY OF COMPUTATION",
  "MACHINE LEARNING",
  "DISCR STRUC FOR COMP SCI",
  "OPTIMIZATION",
  "ELEC & ELECTRONIC CIRCUITS LAB",
  "POWER ELECTRONICS",
  "CONTROL SYSTEMS LABORATORY",
  "PROJECT APPRAISAL",
  "GAME THEORY AND ITS APPLICATIO",
  "ARTIFICIAL INTELLIGENCE",
  "ELECTROMAGNETIC THEO",
  "APPLIED THERMODYNAMICS",
  "ENGINEERING OPTIMIZATION",
  "NEURAL NET & FUZZY LOGIC",
  "PRIMEMOVERS & FLUID MACH",
  "DIGITAL IMAGE PROCESSING",
  "DIGITAL SIGNAL PROCESS",
  "DISCRETE MATHEMATICS",
  "COMMUNICATION NETWORKS",
  "EM FIELDS & MICRO ENGG",
  "SRIMAD BHAGAVAD GITA",
  "INFO THEORY & CODING",
  "THESIS",
  "HUMAN RESOURCE DEVELOP",
  "ELECTROMAGNETIC THEORY",
  "FINANCIAL RISK ANALYTICS & M",
  "FOUNDATIONS OF DATA SCIENCE",
  "CULTURAL STUDIES",
  "URBAN POLICY AND GOVERNANCE",
  "POWER SYSTEMS",
  "INFORMATION RETRIEVAL",
  "IC ENGINES",
  "MECHANICAL VIBRATIONS",
  "INTRODUCTION TO CRITICAL PEDAG",
  "COMPUTER AIDED DESIGN",
  "ADV MECHANICS OF SOLIDS",
  "KIN & DYN OF MACHINES",
  "PRODUCTION TECHNIQUES I",
  "MACHINE DESIGN & DRAWING",
  "PRODUCTION TECHNIQUES II",
  "MATERIALS SCIENCE & ENGG",
  "MECHANICAL ENGG LAB",
  "HUM THEO OF SC & TECH",
  "DATA MINING",
  "ECONOMETRIC METHODS",
  "INSTRU METHODS OF ANAL",
  "NUMBER THEORY",
  "LINGUISTICS",
  "COMPARATIVE INDIAN LIT",
  "SCIENCE,TECH & MODERNITY",
  "SUPPLY CHAIN MANAGEMENT",
  "MATHEMATIC & STAT METHOD",
  "PUBLIC ADMINISTRATION",
  "SOFTWARE ENGINEERING",
  "SEL TOPICS FROM COMP SC",
  "INTRODUCTORY PHILOSOPHY",
  "HUMAN COMP INTERACTION",
  "POP LITER & CULT S ASIA",
  "ELECTROMAGNETIC THEO I",
  "ADV COMMUNICATIVE ENG",
  "CREATIVE WRITING",
  "MONEY BANK & FIN MARKETS",
  "MICROECONOMICS",
  "BUSINESS COMMUNICATION",
  "MACROECONOMICS",
  "CONTEMPORARY INDIA",
  "BIOLOGICAL CHEMISTRY",
  "MICROBIOLOGY",
  "ECONOMIC ENV OF BUSINESS",
  "CONSTRUCTION PLAN & TECH",
  "SURVEYING",
  "HYDRAULIC ENGINEERING",
  "DES OF STEEL STRUCTURES",
  "DESIGN OF REINFORCED CONCRETE",
  "WATER & WASTEWATER TREAT",
  "HIGHWAY ENGINEERING",
  "SOIL MECHANICS",
  "ANALYSIS OF STRUCTURES",
  "ENGINEERING HYDROLOGY",
  "FOUNDATION ENGINEERING",
  "CIVIL ENGINEERING MATERIALS",
  "INTERNATIONAL ECONOMICS",
  "ECONOMIC ANAL OF PUB POL",
  "PUBLIC FIN THEO & POLICY",
  "APPLIED ECONOMETRICS",
  "ECONOMIC OF GROWTH & DEV",
  "POST COLONIAL LITERATURE",
  "ISSUES IN ECONOMIC DEV",
  "PHILOSOPHY OF NAGARJUNA",
  "PUBLIC POLICY",
  "APPLIED STATISTICAL METHODS",
  "ORDINARY DIFF EQUATIONS",
  "MATHEMATICAL METHODS",
  "INTRO TO GLOBALIZATION",
  "LOCAL GOVERNANCE AND PARTICIPA",
  "INTRO TO GENDER STUDIES",
  "GRAPHS AND NETWORKS",
  "ALGEBRA I",
  "CINEMATIC ADAPTATION",
  "ELEMENTARY REAL ANALYSIS",
  "NUMERICAL ANALYSIS",
  "PARTIAL DIFF EQUATIONS",
  "MEASURE & INTEGRATION",
  "INTRO TO FUNCTIONAL ANAL",
  "INTRODUCTION TO TOPOLOGY",
  "NATURAL LANGUAGE PROCESSING",
  "OPERATIONS RESEARCH",
  "DIFFERENTIAL GEOMETRY",
  "INTRODUCTION TO PHONOLOGY",
  "NEGOTIATION SKILLS AND TECHNIQ",
  "CHEMICAL ENGG LAB II",
  "CONTEMPORARY INDAIN ENG FIC",
  "INTERNATIONAL BUSINESS",
  "PROCESS DES PRINCIPLE II",
  "PROCESS DES PRINCIPLES I",
  "PROCESS DYN & CONTROL",
  "SEPARATION PROCESSES I",
  "SEPARATION PROCESSES II",
  "CHEMICAL PROCESS CALCULA",
  "INDUS INSTRUMENT & CONT",
  "CHEMICAL ENGG LAB I",
  "TRANSD & MEASUREMENT TEC",
  "NUM METHOD FOR CHEM ENGG",
  "MATERIAL SCIENCE & ENGG",
  "CHEM ENGG THERMODYNAMICS",
  "KINETICS & REACTOR DESIG",
  "ELECTRO INST & INST TECH",
  "INTRODUCTION TO MEMS",
  "ARTIFICIAL INTELLIGENCE FOR ROBOTS",
  "SUSTAINABLE MANUFACTURING",
  "EFFECTIVE PUBLIC SPEAKING",
  "ENGINEERING CHEMISTRY",
  "COMBINATORIAL MATHEMATICS",
  "AUTOMOTIVE TECHNOLOGY",
  "SCIENCE OF SUSTAINABLE HAPPINESS",
  "LITERARY CRITICISM",
  "DYNAMICS OF SOCIAL CHANGE",
  "ROBOTICS",
  "PHONETICS & SPOKEN ENGLISH",
  "COMPUTER GRAPHICS",
  "COMPUTATIONAL PHYSICS",
  "QUANTUM MECHANICS I",
  "NONLINEAR OPTIMIZATION",
  "CLASSICAL MECHANICS",
  "ENVIRONMENTAL POLLUTION CONTROL",
  "MATERIALS SCIENCE AND ENGINEERING",
  "WIND ENERGY",
  "DEVELOPMENT ECONOMICS",
  "STATISTICAL MECHANICS",
  "ENGINES, MOTORS, AND MOBILITY",
  "COMPUTER-AIDED DESIGN",
  "MANUFACTURING PROCESSES",
  "MANUFACTURING MANAGEMENT",
  "MECHANISMS AND MACHINES",
  "DESIGN OF MACHINE ELEMENTS",
  "ADVANCED PHYSICS LAB",
  "ADVANCED MECHANICS OF SOLIDS",
  "MATHEMATICAL METHODS OF PHYSICS",
  "VIBRATIONS AND CONTROL",
  "ELECTROMAGNETIC THEORY AND APPLICATIONS",
  "MODERN POLITICAL CONCEPTS",
  "ADVANCED MANUFACTURING PROCESSES",
  "ELECTROMAGNETIC THEORY II",
  "AIRPORT, RAIL & WATERWAYS ENGINEERING",
  "SOLID STATE PHYSICS",
  "STRUCTURAL DYNAMICS",
  "ENVIRONMENTAL DEVELOPMENT & CLIMATE CHANGE",
  "OPTICS",
  "MODERN PHYSICS LAB",
  "ATOMIC & MOLECULAR PHYSICS",
  "NUCLEAR & PARTICLE PHYSICS",
  "COMPUTATIONAL GEOMETRY",
  "CRITICAL ANALYSIS OF LITERATURE & CINEMA",
  "QUANTUM MECHANICS II",
  "INTRODUCTION TO MASS COMMUNICATION",
  "ENERGY MANAGEMENT",
  "MECHATRONICS & AUTOMATION",
  "FUEL CELL SCIENCE AND TECHNOLOGY",
  "INTRODUCTION TO MOLECULAR BIOLOGY",
  "ANATOMY, PHYSIOLOGY & HYGIENE",
  "BIOETHICS & BIOSAFETY",
  "DISPENSING PHARMACY",
  "PHARMACEUTICAL FORMULATION & BIOPHARMACEUTICS",
  "FORENSIC PHARMACY",
  "PROCESS ENGINEERING",
  "THIN FILM TECHNOLOGY",
  "PHYSICAL PHARMACY",
  "INTRODUCTION TO NANOSCIENCE",
  "MEDICINAL CHEMISTRY I",
  "MEDICINAL CHEMISTRY II",
  "PHARMACOLOGY II",
  "PHARMACOLOGY I",
  "PHARMACEUTICAL CHEMISTRY",
  "PHARMACEUTICAL ANALYSIS",
  "NATURAL DRUGS",
  "BEHAVIORAL ECONOMICS",
  "STATISTICAL INFERENCE & APPLICATIONS",
  "COLLOIDS AND INTERFACE ENGINEERING",
  "PHYSICAL CHEMISTRY II",
  "ORGANIC CHEMISTRY I",
  "FPGA BASED SYSTEM DESIGN LAB"
];
const axiosInstance = axios.create({
  timeout: 10000, // 10 seconds timeout
});
const SERVER_URL = "http://192.168.0.108:2000"; // Change from localhost
export default function App() {
  const [singleDegree, setSingleDegree] = useState('None');
  const [dualDegree, setDualDegree] = useState('None');
  const [semester, setSemester] = useState('1-1');
  const [subject, setSubject] = useState('');
  const [courseGrade, setGrade] = useState('10');
  const [preferredElective, setPreferredElective] = useState('');
  const [allCourses, setAllCourses] = useState({});
  const [filteredSubjects, setFilteredSubjects] = useState(subjects);
  const [loading, setLoading] = useState(false);
  const [results, setResults] = useState(null);
  const [csv1Variable, setCsv1Variable] = useState([]);
  const [csv2Variable, setCsv2Variable] = useState([]);
  const [csv3Variable, setCsv3Variable] = useState([]);
  const [csv4Variable, setCsv4Variable] = useState([]);
  const addCourse = () => {
    if (subject.trim() !== '') {
      const newCourse = { subject, courseGrade };
      setAllCourses((prevCourses) => {
        const updatedCourses = { ...prevCourses };
        if (!updatedCourses[semester]) {
          updatedCourses[semester] = [];
        }
        updatedCourses[semester].push(newCourse);
        return updatedCourses;
      });
      setSubject('');
      setGrade('10');
      setFilteredSubjects(subjects);
    } else {
      Alert.alert("Input Error", "Subject field cannot be empty.");
    }
  };

  
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const submitForm = async () => {
    const formData = {
      ...allCourses,
      beDegree: singleDegree,
      mscDegree: dualDegree,
      preferredElective: preferredElective
    };

    setIsProcessing(true);
    setIsSubmitted(false);
    console.log('we are here!');
    try {
      const response = await axios.post(`${SERVER_URL}/submit-form`, formData,{
        headers: {
          'Content-Type': 'application/json',
        },
      });
      console.log('we are here!');
      console.log(response.data);
      setIsSubmitted(true);
     
      // Wait for 25 seconds before fetching results
      setTimeout(() => {
        fetchAllCSVData();
      }, 25000);
    } catch (error) {
      console.error('Error submitting form:', error);
      if (error.response) {
        // The request was made and the server responded with a status code
        // that falls out of the range of 2xx
        console.error('Error data:', error.response.data);
        console.error('Error status:', error.response.status);
        console.error('Error headers:', error.response.headers);
        setError(`Server error: ${error.response.status}`);
      } else if (error.request) {
        // The request was made but no response was received
        console.error('No response received:', error.request);
        setError('No response from server. Please check your connection.');
      } else {
        // Something happened in setting up the request that triggered an Error
        console.error('Error message:', error.message);
        setError(`Request failed: ${error.message}`);
      }
      if (error.code === 'ECONNABORTED') {
        setError('Request timed out. Please try again.');
      }
    } finally {
      setIsProcessing(false);
    }
  };

  const fetchAllCSVData = async () => {
    try {
      const [csv1Data, csv2Data, csv3Data, csv4Data] = await Promise.all([
        fetchCSVData('csv1'),
        fetchCSVData('csv2'),
        fetchCSVData('csv3'),
        fetchCSVData('csv4')
      ]);

      displayResults(csv1Data, csv2Data, csv3Data, csv4Data);
    } catch (error) {
      console.error('Error fetching CSV data:', error);
      Alert.alert("Error", "Failed to fetch results. Please try again.");
    }
  };

  const fetchCSVData = async (csvId) => {
    const SERVER_URL = "http://192.168.0.108:2000";


    try {
        const response = await axios.get(`${SERVER_URL}/get-csv-data/${csvId}`);
        if (response.data !== undefined) {
            if (csvId === 'csv2') {
                // For csv2, just return the string directly
                return response.data;
            } else {
                // For other CSVs, split the data as before
                return response.data.split('\n').map(row => row.split(','));
            }
        } else {
            console.warn(`No data received for ${csvId}`);
            return csvId === 'csv2' ? '' : [];
        }
    } catch (error) {
        console.error(`Error fetching ${csvId} data:`, error);
        return csvId === 'csv2' ? '' : [];
    }
};

  
  const displayResults = (csv1Data, csv2Data, csv3Data, csv4Data) => {
    setResults({
      useCase1: Array.isArray(csv1Data) && csv1Data.length > 0 ? csv1Data : ["No data available"],
      predictedCGPA: csv2Data !== '' ? csv2Data : "Data not available",
      learningPathways: Array.isArray(csv3Data) && csv3Data.length > 0 ? csv3Data : ["No data available"],
      electivesPersonalization: Array.isArray(csv4Data) && csv4Data.length > 0 ? csv4Data : ["No data available"],
    });
  };

  const handleSubjectChange = (text) => {
    setSubject(text);
    setFilteredSubjects(subjects.filter(sub => sub.toLowerCase().includes(text.toLowerCase())));
  };

  const renderCourseItem = ({ item, index }) => (
    <TouchableOpacity style={styles.courseItem} onPress={() => Alert.alert(
      "Delete Course",
      "Do you want to delete this entry?",
      [
        { text: "No", style: "cancel" },
        { text: "Yes", onPress: () => {
          setAllCourses((prevCourses) => {
            const updatedCourses = { ...prevCourses };
            updatedCourses[semester] = updatedCourses[semester].filter((_, i) => i !== index);
            return updatedCourses;
          });
        }}
      ]
    )}>
      <Text style={styles.courseText}>{item.subject}: {item.courseGrade}</Text>
    </TouchableOpacity>
  );

  const currentCourses = allCourses[semester] || [];
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [isSubjectPickerVisible, setIsSubjectPickerVisible] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");

  
  return (
    <KeyboardAvoidingView behavior="padding" style={{ flex: 1 }}>
      <FlatList
        ListHeaderComponent={
          <>
            <View style={styles.container}>
              <StatusBar style="auto" />
              <Text style={styles.heading}>Welcome to the Course Recommendation Portal</Text>
  
              {/* Degree Pickers */}
              <View style={styles.selectionContainer}>
                <Text style={styles.label}>Single Degree:</Text>
                <Picker selectedValue={singleDegree} style={styles.picker} onValueChange={setSingleDegree}>
                  <Picker.Item label="None" value="None" />
                  <Picker.Item label="B.E Chemical" value="B.E Chemical" />
                  <Picker.Item label="B.E Civil" value="B.E Civil" />
                  <Picker.Item label="B.E Computer Science" value="B.E Computer Science" />
                  <Picker.Item label="B.E Electrical & Electronic" value="B.E Electrical & Electronic" />
                  <Picker.Item label="B.E Electronics & Communication" value="B.E Electronics & Communication" />
                  <Picker.Item label="B.E Electronics and Instrumentation" value="B.E Electronics and Instrumentation" />
                  <Picker.Item label="B.E Mechanical" value="B.E Mechanical" />
                  <Picker.Item label="B.Pharm" value="B.Pharm" />
                </Picker>
  
                <Text style={styles.label}>Dual Degree:</Text>
                <Picker selectedValue={dualDegree} style={styles.picker} onValueChange={setDualDegree}>
                  <Picker.Item label="None" value="None" />
                  <Picker.Item label="M.Sc. Economics" value="M.Sc. Economics" />
                  <Picker.Item label="M.Sc. Bio" value="M.Sc. Bio" />
                  <Picker.Item label="M.Sc. Physics" value="M.Sc. Physics" />
                  <Picker.Item label="M.Sc. Chemistry" value="M.Sc. Chemistry" />
                  <Picker.Item label="M.Sc. Mathematics" value="M.Sc. Mathematics" />
                </Picker>
              </View>
  
              {/* Semester Picker */}
              <View style={styles.selectionContainer}>
                <Text style={styles.label}>Semester:</Text>
                <Picker selectedValue={semester} style={styles.picker} onValueChange={setSemester}>
                  <Picker.Item label="1-1" value="1-1" />
                  <Picker.Item label="1-2" value="1-2" />
                  <Picker.Item label="2-1" value="2-1" />
                  <Picker.Item label="2-2" value="2-2" />
                  <Picker.Item label="3-1" value="3-1" />
                  <Picker.Item label="3-2" value="3-2" />
                  <Picker.Item label="4-1" value="4-1" />
                  <Picker.Item label="4-2" value="4-2" />
                </Picker>
              </View>
  
              <Text style={styles.label}>Selected Courses:</Text>
            </View>
          </>
        }
        data={currentCourses}
        renderItem={renderCourseItem}
        keyExtractor={(item, index) => index.toString()}
  
        ListFooterComponent={
          <>
            {/* Subject Input */}
            <View style={styles.formContainer}>
              <Text style={styles.label}>Subject:</Text>
              <TextInput
                style={styles.input}
                placeholder="Search or select a subject"
                value={searchTerm}
                onChangeText={(text) => { setSearchTerm(text); setDropdownVisible(true); }}
                onFocus={() => setDropdownVisible(true)}
              />
  
              {dropdownVisible && (
                <ScrollView style={styles.dropdownContainer}>
                  {filteredSubjects
                    .filter((item) => item.toLowerCase().includes(searchTerm.toLowerCase()))
                    .map((item, index) => (
                      <TouchableOpacity key={index} onPress={() => { setSubject(item); setDropdownVisible(false); setSearchTerm(item); }}>
                        <Text style={styles.suggestionItem}>{item}</Text>
                      </TouchableOpacity>
                    ))}
                </ScrollView>
              )}
  
              <Text style={styles.label}>Grade:</Text>
              <Picker selectedValue={courseGrade} style={styles.picker} onValueChange={setGrade}>
                <Picker.Item label="A" value="10" />
                <Picker.Item label="A-" value="9" />
                <Picker.Item label="B" value="8" />
                <Picker.Item label="B-" value="7" />
                <Picker.Item label="C" value="6" />
                <Picker.Item label="C-" value="5" />
                <Picker.Item label="D" value="4" />
                <Picker.Item label="E" value="3" />
              </Picker>
  
              <Button title="Add Course" onPress={() => { addCourse(); setDropdownVisible(false); setSearchTerm(""); }} color="#6200ea" />
            </View>
  
            <View style={styles.selectionContainer}>
              <Button title={isProcessing ? "Processing..." : "Submit"} onPress={submitForm} color="#6200ea" disabled={isProcessing} />
            </View>
  
            {isProcessing && <ActivityIndicator size="large" color="#0000ff" />}
            {isSubmitted && !results && (
              <Text style={styles.processingText}>Processing your request. Results will be available shortly.</Text>
            )}
  
            {results && (
              <View>
                <Text style={styles.heading}>Results</Text>
                <Text style={styles.subHeading}>Use Case 1: Recommended Courses for Next Semester</Text>
                {results.useCase1.map((course, index) => (
                  <Text key={index}>{course[0]}</Text>
                ))}
                <Text style={styles.subHeading}>Use Case 2: Predicted Final CGPA</Text>
                <Text>Your Predicted CGPA by the end of 4-2 would be: {results.predictedCGPA}</Text>
                <Text style={styles.subHeading}>Use Case 3: Learning Pathways to Improve Grade</Text>
                {results.learningPathways.map((course, index) => (
                  <Text key={index}>{course[0]}</Text>
                ))}
                <Text style={styles.subHeading}>Use Case 4: Electives Personalization</Text>
                <Text>Your preferred elective is: {preferredElective}</Text>
                {results.electivesPersonalization.map((course, index) => (
                  <Text key={index}>{course[0]}</Text>
                ))}
              </View>
            )}
          </>
        }
      />
    </KeyboardAvoidingView>
  );
  
  

  
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    padding: 20,
    backgroundColor: '#fff',
  },
  heading: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 20,
    color: '#6200ea',
    fontWeight: 'bold',
  },
  subHeading: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 15,
    marginBottom: 5,
  },
  selectionContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  picker: {
    height: 50,
    width: '100%',
  },
  coursesContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  courseList: {
   
  },
  courseItem: {
    padding: 10,
    backgroundColor: '#f9f9f9',
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  courseText: {
    fontSize: 16,
  },
  formContainer: {
    marginBottom: 20,
    backgroundColor: '#fff',
    padding: 10,
    borderRadius: 10,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 10,
    borderRadius: 5,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  note: {
    fontSize: 12,
    color: '#888',
    marginTop: 5,
  },
  suggestionList: {
    maxHeight: 100,
    marginTop: 5,
  },
  suggestionItem: {
    padding: 10,
    fontSize: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  resultsContainer: {
    marginTop: 20,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
  },
  processingText: {
    marginTop: 20,
    fontSize: 16,
    textAlign: 'center',
    color: '#666',
  },
  suggestionList: {
    maxHeight: 150, // Adjust this value as needed
    borderWidth: 1,
    borderColor: '#ccc',
    marginBottom: 10,
  },
  suggestionItem: {
    padding: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
});