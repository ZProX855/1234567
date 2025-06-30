import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
  Platform,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { MapPin, Clock, Sunrise, Sunset } from 'lucide-react-native';
import * as Location from 'expo-location';

const { width } = Dimensions.get('window');

interface PrayerTime {
  name: string;
  time: string;
  icon: React.ReactNode;
  isNext: boolean;
}

export default function HomeScreen() {
  const [location, setLocation] = useState<string>('Loading...');
  const [currentTime, setCurrentTime] = useState(new Date());
  const [prayerTimes] = useState<PrayerTime[]>([
    {
      name: 'Fajr',
      time: '05:30',
      icon: <Sunrise size={20} color="#4A90E2" strokeWidth={2} />,
      isNext: false,
    },
    {
      name: 'Dhuhr',
      time: '12:45',
      icon: <Clock size={20} color="#F5A623" strokeWidth={2} />,
      isNext: true,
    },
    {
      name: 'Asr',
      time: '15:30',
      icon: <Clock size={20} color="#F5A623" strokeWidth={2} />,
      isNext: false,
    },
    {
      name: 'Maghrib',
      time: '18:15',
      icon: <Sunset size={20} color="#E94B3C" strokeWidth={2} />,
      isNext: false,
    },
    {
      name: 'Isha',
      time: '19:45',
      icon: <Clock size={20} color="#7B68EE" strokeWidth={2} />,
      isNext: false,
    },
  ]);

  useEffect(() => {
    // Update current time every minute
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 60000);

    // Get user location
    getLocation();

    return () => clearInterval(timer);
  }, []);

  const getLocation = async () => {
    try {
      if (Platform.OS !== 'web') {
        const { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
          setLocation('Location permission denied');
          return;
        }

        const location = await Location.getCurrentPositionAsync({});
        const address = await Location.reverseGeocodeAsync({
          latitude: location.coords.latitude,
          longitude: location.coords.longitude,
        });

        if (address[0]) {
          setLocation(`${address[0].city}, ${address[0].country}`);
        }
      } else {
        setLocation('New York, USA');
      }
    } catch (error) {
      setLocation('Unable to get location');
    }
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString('en-US', {
      hour: '2-digit',
      minute: '2-digit',
      hour12: true,
    });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });
  };

  return (
    <SafeAreaView style={styles.container}>
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.headerGradient}>
        <View style={styles.header}>
          <View style={styles.locationContainer}>
            <MapPin size={16} color="#FFFFFF" strokeWidth={2} />
            <Text style={styles.locationText}>{location}</Text>
          </View>
          <Text style={styles.currentTime}>{formatTime(currentTime)}</Text>
          <Text style={styles.currentDate}>{formatDate(currentTime)}</Text>
        </View>
      </LinearGradient>

      <ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}>
        
        {/* Next Prayer Card */}
        <View style={styles.nextPrayerCard}>
          <BlurView intensity={20} style={styles.blurContainer}>
            <Text style={styles.nextPrayerLabel}>Next Prayer</Text>
            <View style={styles.nextPrayerInfo}>
              <Text style={styles.nextPrayerName}>Dhuhr</Text>
              <Text style={styles.nextPrayerTime}>12:45 PM</Text>
            </View>
            <Text style={styles.timeRemaining}>in 2 hours 15 minutes</Text>
          </BlurView>
        </View>

        {/* Prayer Times List */}
        <View style={styles.prayerTimesContainer}>
          <Text style={styles.sectionTitle}>Today's Prayer Times</Text>
          {prayerTimes.map((prayer, index) => (
            <TouchableOpacity
              key={index}
              style={[
                styles.prayerTimeItem,
                prayer.isNext && styles.nextPrayerItem,
              ]}>
              <View style={styles.prayerTimeLeft}>
                <View style={styles.prayerIcon}>{prayer.icon}</View>
                <Text
                  style={[
                    styles.prayerName,
                    prayer.isNext && styles.nextPrayerText,
                  ]}>
                  {prayer.name}
                </Text>
              </View>
              <Text
                style={[
                  styles.prayerTime,
                  prayer.isNext && styles.nextPrayerText,
                ]}>
                {prayer.time}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        {/* Quick Actions */}
        <View style={styles.quickActionsContainer}>
          <Text style={styles.sectionTitle}>Quick Actions</Text>
          <View style={styles.quickActionsGrid}>
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionEmoji}>📿</Text>
              </View>
              <Text style={styles.quickActionText}>Dhikr</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionEmoji}>🕋</Text>
              </View>
              <Text style={styles.quickActionText}>Qibla</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionEmoji}>📖</Text>
              </View>
              <Text style={styles.quickActionText}>Quran</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.quickActionItem}>
              <View style={styles.quickActionIcon}>
                <Text style={styles.quickActionEmoji}>🤲</Text>
              </View>
              <Text style={styles.quickActionText}>Duas</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  headerGradient: {
    paddingTop: 20,
    paddingBottom: 30,
  },
  header: {
    paddingHorizontal: 20,
    alignItems: 'center',
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  locationText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    marginLeft: 6,
    opacity: 0.9,
  },
  currentTime: {
    color: '#FFFFFF',
    fontSize: 32,
    fontFamily: 'Inter-Bold',
    marginBottom: 4,
  },
  currentDate: {
    color: '#FFFFFF',
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    opacity: 0.8,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 100,
  },
  nextPrayerCard: {
    marginHorizontal: 20,
    marginTop: -20,
    marginBottom: 30,
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
  },
  blurContainer: {
    padding: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  nextPrayerLabel: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#8E8E93',
    marginBottom: 8,
  },
  nextPrayerInfo: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  nextPrayerName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1D1D1F',
  },
  nextPrayerTime: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#007AFF',
  },
  timeRemaining: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
  prayerTimesContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1D1D1F',
    marginBottom: 16,
  },
  prayerTimeItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  nextPrayerItem: {
    backgroundColor: '#007AFF',
    elevation: 4,
    shadowOpacity: 0.15,
  },
  prayerTimeLeft: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  prayerIcon: {
    marginRight: 12,
  },
  prayerName: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1D1D1F',
  },
  prayerTime: {
    fontSize: 16,
    fontFamily: 'Inter-SemiBold',
    color: '#1D1D1F',
  },
  nextPrayerText: {
    color: '#FFFFFF',
  },
  quickActionsContainer: {
    marginHorizontal: 20,
  },
  quickActionsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  quickActionItem: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 12,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  quickActionIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: '#F2F2F7',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  quickActionEmoji: {
    fontSize: 24,
  },
  quickActionText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1D1D1F',
  },
});