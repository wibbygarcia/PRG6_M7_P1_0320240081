import React, {
    useState,
    useEffect,
    useMemo,
    useRef} from "react";
import { View, Text, SafeAreaView, StyleSheet,
    TouchableOpacity,
    ScrollView,
    Alert,
    TextInput} from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const HomeScreen = () => {

    // 2. STATE UNTUK STATUS TOMBOL CHECK-IN
    const [isCheckedIn, setIsCheckedIn] = useState(false);

    // 3. STATE UNTUK JAM DIGITAL
    const [currentTime, setCurrentTime] = useState('Memuat jam...');

    // 4. STATE & REF UNTUK CATATAN (Baru)
    const [note, setNote] = useState('');
    const noteInputRef = useRef(null); // Membuat "kait" kosong untuk UI

    // Simulasi statis karena data dipindah ke HistoryScreen
    const attendanceStats = useMemo( () => {
        return { totalPresent: 12, totalAbsent: 2 };
    }, []);

    useEffect( () => {
        const timer = setInterval( () => {
            setCurrentTime(new Date().toLocaleTimeString('id-ID'));
        }, 1000);
        return () => clearInterval(timer);
    }, []);

    const handleCheckIn = () => {
        if (isCheckedIn) return Alert.alert( "Perhatian", "Anda sudah Check In.");
        if (note.trim() === '') {
            Alert.alert( "Peringatan", "Catatan kehadiran wajib diisi!");
            noteInputRef.current.focus();
            return;
        }
        setIsCheckedIn(true);
        Alert.alert("Sukses", `Berhasil Check In pada pukul ${currentTime}`);
    };

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.content}>
                <View style={styles.headerRow}>
                    <Text style={styles.title}>Attendance App</Text>
                    {/* Tampilkan State Jam Digital */}
                    <Text style={styles.clockText}>{currentTime}</Text>
                </View>

                {/* Student Card */}
                <View style={styles.card}>
                    <View style={styles.icon}>
                        <MaterialIcons name="person" size={40} color="#555" />
                    </View>
                    <View>
                        <Text style={styles.name}>Wibby Garcia Kurniawan</Text>
                        <Text>NIM : 0320240081</Text>
                        <Text>Class : Informatika-2A</Text>
                    </View>
                </View>

                {/* Today's Class */}
                <View style={styles.classCard}>
                    <Text style={styles.subtitle}>Today's Class</Text>
                    <Text>Mobile Programming</Text>
                    <Text>08:00 - 10:00</Text>
                    <Text>Lab 3</Text>

                    {/* Fitur Baru: Kolom Input Catatan dengan useRef */}
                    {!isCheckedIn && (
                        <TextInput
                            ref={noteInputRef} // <-- Menempelkan referensi ke elemen ini
                            style={styles.inputCatatan}
                            placeholder="Tulis catatan (cth: Hadir lab)"
                            value={note}
                            onChangeText={setNote}
                        />
                    )}

                    <TouchableOpacity
                        style={[styles.button, isCheckedIn ? styles.buttonDisabled : styles.buttonActive]}
                        onPress={handleCheckIn}
                        disabled={isCheckedIn}
                    >
                        <Text style={styles.buttonText}>
                            {isCheckedIn ? "CHECKED IN" : "CHECK IN"}
                        </Text>
                    </TouchableOpacity>
                </View>

                {/* Fitur Baru: Statistik Kehadiran (Hasil useMemo) */}
                <View style={styles.statsCard}>
                    <View style={styles.statBox}>
                        <Text style={styles.statNumber}>{attendanceStats.totalPresent}</Text>
                        <Text style={styles.statLabel}>Total Present</Text>
                    </View>
                    <View style={styles.statBox}>
                        <Text style={[styles.statNumber, { color: 'red' }]}>{attendanceStats.totalAbsent}</Text>
                        <Text style={styles.statLabel}>Total Absent</Text>
                    </View>
                </View>
            </ScrollView>
        </SafeAreaView>
    );
};

const styles = StyleSheet.create({
        container : {
            flex : 1,
            padding : 20,
            backgroundColor : "#f5f5f5"
        },

        title: {
            fonstSize : 24,
            fontWeight : "bold"
        },

        card: {
            flexDirection: "row",
            backgroundColor: "white",
            padding: 15,
            borderRadius: 10,
            marginBottom: 20,
        },

        icon: {
            width: 60,
            height: 60,
            borderRadius: 30,
            backgroundColor: "#eee",
            alignItems: "center",
            justifyContent: "center",
            marginRight: 15,
        },

        name: {
            fontSize: 18,
            fontWeight: "bold",
        },

        subtitle:{
            fontSize: 18,
            fontWeight: "bold",
            marginBottom: 10
        },

        button: {
            marginTop: 10,
            backgroundColor: "#007AFF",
            padding: 10,
            borderRadius: 8,
            alignItems: "center",
        },

        buttonText: {
            color: "white",
        },

        content : {
            padding : 20,
            paddingBottom : 40
        },

        item: {
            flexDirection: "row",
            justifyContent: "space-between",
            backgroundColor: "white",
            padding: 12,
            borderRadius: 8,
            marginBottom: 8,
        },

        course: {
            fontSize: 16,
        },

        date: {
            fontSize: 12,
            color: "gray",
        },

        present: {
            color: "green",
            fontWeight: "bold",
        },

        absent: {
            color: "red",
            fontWeight: "bold",
        },
        
        statusRow: {
            flexDirection: "row",
            alignItems: "center",
        },

        headerRow: {
            flexDirection: "row",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 10,
        },

        clockText: {
            fontSIze: 16,
            fontWeight: 'bold',
            color: '#007AFF',
            fontVariant: ['tabular-nums']
        },

        buttonActive: {
            backgroundColor : "#007AFF",
        },

        buttonDisabled: {
            backgroundColor: '#A0C4FF',
        },

        inputCatatan: {
            borderWidth: 1,
            borderColor: "#ccc",
            borderRadius: 8,
            padding: 10,
            marginTop: 10,
        },

        summaryBox: {
            marginTop: 10,
            padding: 10,
            backgroundColor: "#eee",
            borderRadius: 8,
        },

        statsCard: {
            flexDirection: "row",
            justifyContent: "space-between",
            marginTop: 10,
        },

        statBox: {
            flex: 1,
            backgroundColor: "#fff",
            padding: 15,
            marginHorizontal: 5,
            borderRadius: 10,
            alignItems: "center",
        },

        statNumber: {
            fontSize: 20,
            fontWeight: "bold",
        },

        statLabel: {
            fontSize: 12,
            color: "gray",
        },
    });

export default HomeScreen;