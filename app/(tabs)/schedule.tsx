import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Calendar, ChevronLeft, ChevronRight, Clock } from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface ScheduleItem {
  id: string;
  title: string;
  time: string;
  type: 'prayer' | 'event' | 'reminder';
  completed?: boolean;
}

const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const months = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December'
];

export default function ScheduleScreen() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const scheduleItems: ScheduleItem[] = [
    { id: '1', title: 'Fajr Prayer', time: '05:30', type: 'prayer', completed: true },
    { id: '2', title: 'Morning Dhikr', time: '06:00', type: 'reminder', completed: true },
    { id: '3', title: 'Dhuhr Prayer', time: '12:45', type: 'prayer', completed: false },
    { id: '4', title: 'Quran Reading', time: '14:00', type: 'reminder', completed: false },
    { id: '5', title: 'Asr Prayer', time: '15:30', type: 'prayer', completed: false },
    { id: '6', title: 'Islamic Study Circle', time: '19:00', type: 'event', completed: false },
    { id: '7', title: 'Maghrib Prayer', time: '18:15', type: 'prayer', completed: false },
    { id: '8', title: 'Isha Prayer', time: '19:45', type: 'prayer', completed: false },
  ];

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    const days = [];
    
    // Add empty cells for days before the first day of the month
    for (let i = 0; i < startingDayOfWeek; i++) {
      days.push(null);
    }
    
    // Add days of the month
    for (let day = 1; day <= daysInMonth; day++) {
      days.push(new Date(year, month, day));
    }
    
    return days;
  };

  const navigateMonth = (direction: 'prev' | 'next') => {
    const newMonth = new Date(currentMonth);
    if (direction === 'prev') {
      newMonth.setMonth(currentMonth.getMonth() - 1);
    } else {
      newMonth.setMonth(currentMonth.getMonth() + 1);
    }
    setCurrentMonth(newMonth);
  };

  const isToday = (date: Date | null) => {
    if (!date) return false;
    const today = new Date();
    return date.toDateString() === today.toDateString();
  };

  const isSelected = (date: Date | null) => {
    if (!date) return false;
    return date.toDateString() === selectedDate.toDateString();
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'prayer': return '#007AFF';
      case 'event': return '#34C759';
      case 'reminder': return '#FF9500';
      default: return '#8E8E93';
    }
  };

  const days = getDaysInMonth(currentMonth);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Schedule</Text>
        <Calendar size={24} color="#007AFF" strokeWidth={2} />
      </View>

      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Calendar */}
        <View style={styles.calendarContainer}>
          <View style={styles.calendarHeader}>
            <TouchableOpacity
              onPress={() => navigateMonth('prev')}
              style={styles.navButton}>
              <ChevronLeft size={20} color="#007AFF" strokeWidth={2} />
            </TouchableOpacity>
            
            <Text style={styles.monthYear}>
              {months[currentMonth.getMonth()]} {currentMonth.getFullYear()}
            </Text>
            
            <TouchableOpacity
              onPress={() => navigateMonth('next')}
              style={styles.navButton}>
              <ChevronRight size={20} color="#007AFF" strokeWidth={2} />
            </TouchableOpacity>
          </View>

          <View style={styles.weekDaysContainer}>
            {weekDays.map((day) => (
              <Text key={day} style={styles.weekDay}>
                {day}
              </Text>
            ))}
          </View>

          <View style={styles.daysGrid}>
            {days.map((day, index) => (
              <TouchableOpacity
                key={index}
                style={[
                  styles.dayCell,
                  day && isToday(day) && styles.todayCell,
                  day && isSelected(day) && styles.selectedCell,
                ]}
                onPress={() => day && setSelectedDate(day)}
                disabled={!day}>
                {day && (
                  <Text
                    style={[
                      styles.dayText,
                      isToday(day) && styles.todayText,
                      isSelected(day) && styles.selectedText,
                    ]}>
                    {day.getDate()}
                  </Text>
                )}
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Schedule for Selected Date */}
        <View style={styles.scheduleContainer}>
          <Text style={styles.scheduleTitle}>
            {selectedDate.toLocaleDateString('en-US', {
              weekday: 'long',
              month: 'long',
              day: 'numeric',
            })}
          </Text>

          {scheduleItems.map((item) => (
            <TouchableOpacity key={item.id} style={styles.scheduleItem}>
              <View style={styles.scheduleItemLeft}>
                <View
                  style={[
                    styles.typeIndicator,
                    { backgroundColor: getTypeColor(item.type) },
                    item.completed && styles.completedIndicator,
                  ]}
                />
                <View style={styles.scheduleItemContent}>
                  <Text
                    style={[
                      styles.scheduleItemTitle,
                      item.completed && styles.completedText,
                    ]}>
                    {item.title}
                  </Text>
                  <View style={styles.timeContainer}>
                    <Clock size={12} color="#8E8E93" strokeWidth={2} />
                    <Text style={styles.scheduleItemTime}>{item.time}</Text>
                  </View>
                </View>
              </View>
              
              {item.completed && (
                <View style={styles.checkmark}>
                  <Text style={styles.checkmarkText}>✓</Text>
                </View>
              )}
            </TouchableOpacity>
          ))}
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
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E5EA',
  },
  headerTitle: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1D1D1F',
  },
  calendarContainer: {
    backgroundColor: '#FFFFFF',
    margin: 20,
    borderRadius: 16,
    padding: 20,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  calendarHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  navButton: {
    padding: 8,
  },
  monthYear: {
    fontSize: 18,
    fontFamily: 'Inter-SemiBold',
    color: '#1D1D1F',
  },
  weekDaysContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  weekDay: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#8E8E93',
    textAlign: 'center',
    width: (width - 80) / 7,
  },
  daysGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  dayCell: {
    width: (width - 80) / 7,
    height: 40,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 8,
  },
  todayCell: {
    backgroundColor: '#007AFF',
    borderRadius: 20,
  },
  selectedCell: {
    backgroundColor: '#34C759',
    borderRadius: 20,
  },
  dayText: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#1D1D1F',
  },
  todayText: {
    color: '#FFFFFF',
  },
  selectedText: {
    color: '#FFFFFF',
  },
  scheduleContainer: {
    marginHorizontal: 20,
    marginBottom: 100,
  },
  scheduleTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1D1D1F',
    marginBottom: 16,
  },
  scheduleItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    marginBottom: 8,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  scheduleItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  typeIndicator: {
    width: 4,
    height: 40,
    borderRadius: 2,
    marginRight: 12,
  },
  completedIndicator: {
    opacity: 0.5,
  },
  scheduleItemContent: {
    flex: 1,
  },
  scheduleItemTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  completedText: {
    textDecorationLine: 'line-through',
    opacity: 0.6,
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  scheduleItemTime: {
    fontSize: 12,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
    marginLeft: 4,
  },
  checkmark: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkmarkText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
});