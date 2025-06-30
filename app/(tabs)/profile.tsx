import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Image,
  Dimensions,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import {
  User,
  Award,
  Calendar,
  Clock,
  Target,
  TrendingUp,
  Edit3,
} from 'lucide-react-native';

const { width } = Dimensions.get('window');

interface StatItem {
  label: string;
  value: string;
  icon: React.ReactNode;
  color: string;
}

export default function ProfileScreen() {
  const [user] = useState({
    name: 'Ahmed Hassan',
    email: 'ahmed.hassan@example.com',
    joinDate: 'January 2024',
    avatar: 'https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150&h=150&dpr=2',
  });

  const stats: StatItem[] = [
    {
      label: 'Prayers Completed',
      value: '847',
      icon: <Clock size={20} color="#007AFF" strokeWidth={2} />,
      color: '#007AFF',
    },
    {
      label: 'Current Streak',
      value: '23 days',
      icon: <TrendingUp size={20} color="#34C759" strokeWidth={2} />,
      color: '#34C759',
    },
    {
      label: 'Quran Pages',
      value: '156',
      icon: <Target size={20} color="#FF9500" strokeWidth={2} />,
      color: '#FF9500',
    },
    {
      label: 'Achievements',
      value: '12',
      icon: <Award size={20} color="#AF52DE" strokeWidth={2} />,
      color: '#AF52DE',
    },
  ];

  const achievements = [
    { title: 'First Prayer', description: 'Completed your first prayer', earned: true },
    { title: '7 Day Streak', description: 'Prayed for 7 consecutive days', earned: true },
    { title: '30 Day Streak', description: 'Prayed for 30 consecutive days', earned: false },
    { title: 'Quran Reader', description: 'Read 100 pages of Quran', earned: true },
    { title: 'Early Bird', description: 'Never missed Fajr for a week', earned: true },
    { title: 'Dedicated', description: 'Used app for 6 months', earned: false },
  ];

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Profile Header */}
        <LinearGradient
          colors={['#667eea', '#764ba2']}
          style={styles.headerGradient}>
          <View style={styles.profileHeader}>
            <View style={styles.avatarContainer}>
              <Image source={{ uri: user.avatar }} style={styles.avatar} />
              <TouchableOpacity style={styles.editButton}>
                <Edit3 size={16} color="#FFFFFF" strokeWidth={2} />
              </TouchableOpacity>
            </View>
            <Text style={styles.userName}>{user.name}</Text>
            <Text style={styles.userEmail}>{user.email}</Text>
            <View style={styles.joinDateContainer}>
              <Calendar size={14} color="#FFFFFF" strokeWidth={2} />
              <Text style={styles.joinDate}>Joined {user.joinDate}</Text>
            </View>
          </View>
        </LinearGradient>

        {/* Stats Grid */}
        <View style={styles.statsContainer}>
          <Text style={styles.sectionTitle}>Your Progress</Text>
          <View style={styles.statsGrid}>
            {stats.map((stat, index) => (
              <View key={index} style={styles.statCard}>
                <View style={[styles.statIcon, { backgroundColor: `${stat.color}15` }]}>
                  {stat.icon}
                </View>
                <Text style={styles.statValue}>{stat.value}</Text>
                <Text style={styles.statLabel}>{stat.label}</Text>
              </View>
            ))}
          </View>
        </View>

        {/* Achievements */}
        <View style={styles.achievementsContainer}>
          <Text style={styles.sectionTitle}>Achievements</Text>
          <View style={styles.achievementsList}>
            {achievements.map((achievement, index) => (
              <View
                key={index}
                style={[
                  styles.achievementItem,
                  !achievement.earned && styles.lockedAchievement,
                ]}>
                <View style={styles.achievementLeft}>
                  <View
                    style={[
                      styles.achievementIcon,
                      achievement.earned
                        ? styles.earnedIcon
                        : styles.lockedIcon,
                    ]}>
                    <Award
                      size={20}
                      color={achievement.earned ? '#FFD700' : '#8E8E93'}
                      strokeWidth={2}
                    />
                  </View>
                  <View style={styles.achievementContent}>
                    <Text
                      style={[
                        styles.achievementTitle,
                        !achievement.earned && styles.lockedText,
                      ]}>
                      {achievement.title}
                    </Text>
                    <Text
                      style={[
                        styles.achievementDescription,
                        !achievement.earned && styles.lockedText,
                      ]}>
                      {achievement.description}
                    </Text>
                  </View>
                </View>
                {achievement.earned && (
                  <View style={styles.earnedBadge}>
                    <Text style={styles.earnedText}>✓</Text>
                  </View>
                )}
              </View>
            ))}
          </View>
        </View>

        {/* Profile Actions */}
        <View style={styles.actionsContainer}>
          <TouchableOpacity style={styles.actionButton}>
            <User size={20} color="#007AFF" strokeWidth={2} />
            <Text style={styles.actionText}>Edit Profile</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.actionButton}>
            <Target size={20} color="#007AFF" strokeWidth={2} />
            <Text style={styles.actionText}>Set Goals</Text>
          </TouchableOpacity>
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
    paddingBottom: 40,
  },
  profileHeader: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  avatarContainer: {
    position: 'relative',
    marginBottom: 16,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 4,
    borderColor: '#FFFFFF',
  },
  editButton: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    backgroundColor: '#007AFF',
    width: 32,
    height: 32,
    borderRadius: 16,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#FFFFFF',
  },
  userName: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    fontFamily: 'Inter-Regular',
    color: '#FFFFFF',
    opacity: 0.8,
    marginBottom: 12,
  },
  joinDateContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  joinDate: {
    fontSize: 14,
    fontFamily: 'Inter-Medium',
    color: '#FFFFFF',
    opacity: 0.8,
    marginLeft: 6,
  },
  statsContainer: {
    marginHorizontal: 20,
    marginTop: -20,
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 20,
    fontFamily: 'Inter-SemiBold',
    color: '#1D1D1F',
    marginBottom: 16,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  statCard: {
    width: (width - 60) / 2,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    marginBottom: 12,
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  statIcon: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  statValue: {
    fontSize: 24,
    fontFamily: 'Inter-Bold',
    color: '#1D1D1F',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    fontFamily: 'Inter-Medium',
    color: '#8E8E93',
    textAlign: 'center',
  },
  achievementsContainer: {
    marginHorizontal: 20,
    marginBottom: 30,
  },
  achievementsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
  },
  achievementItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F2F2F7',
  },
  lockedAchievement: {
    opacity: 0.6,
  },
  achievementLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  achievementIcon: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  earnedIcon: {
    backgroundColor: '#FFD70015',
  },
  lockedIcon: {
    backgroundColor: '#F2F2F7',
  },
  achievementContent: {
    flex: 1,
  },
  achievementTitle: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#1D1D1F',
    marginBottom: 2,
  },
  achievementDescription: {
    fontSize: 14,
    fontFamily: 'Inter-Regular',
    color: '#8E8E93',
  },
  lockedText: {
    opacity: 0.6,
  },
  earnedBadge: {
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#34C759',
    justifyContent: 'center',
    alignItems: 'center',
  },
  earnedText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontFamily: 'Inter-Bold',
  },
  actionsContainer: {
    marginHorizontal: 20,
    marginBottom: 100,
  },
  actionButton: {
    flexDirection: 'row',
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
  actionText: {
    fontSize: 16,
    fontFamily: 'Inter-Medium',
    color: '#007AFF',
    marginLeft: 12,
  },
});