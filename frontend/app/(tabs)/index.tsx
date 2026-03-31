import { StyleSheet, Pressable, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useColorScheme } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useThemeColor } from '@/hooks/use-theme-color';

export default function HomeScreen() {
  const handleBookNow = () => {
    Alert.alert('Book Now', 'Booking feature coming soon!');
  };

  const handleServicePress = (service: string) => {
    Alert.alert('Service', `${service} details coming soon!`);
  };

  // Get current theme and toggle
  const colorScheme = useColorScheme();
  
  // Get theme colors
  const cardColor = useThemeColor({}, 'card');
  const borderColor = useThemeColor({}, 'border');
  const gradientStart = useThemeColor({}, 'gradientStart');
  const gradientEnd = useThemeColor({}, 'gradientEnd');
  const textColor = useThemeColor({}, 'text');

  return (
    <ThemedView style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
        {/* Theme Indicator */}
        <ThemedView style={styles.themeIndicator}>
          <Ionicons 
            name={colorScheme === 'dark' ? 'moon' : 'sunny'} 
            size={16} 
            color={textColor} 
          />
          <ThemedText style={styles.themeText}>
            {colorScheme === 'dark' ? '🌙 Dark Mode' : '☀️ Light Mode'}
          </ThemedText>
        </ThemedView>

        {/* Hero Section */}
        <LinearGradient
          colors={[gradientStart, gradientEnd]}
          style={styles.heroSection}
        >
          <ThemedView style={styles.heroContent}>
            <Ionicons name="car" size={80} color="#fff" style={{
              textShadowColor: 'rgba(0, 0, 0, 0.3)',
              textShadowOffset: { width: 0, height: 2 },
              textShadowRadius: 4,
            }} />
            <ThemedText type="title" style={styles.heroTitle} lightColor="#fff" darkColor="#fff">
              Hello CarWash
            </ThemedText>
            <ThemedText style={styles.heroSubtitle} lightColor="#fff" darkColor="#fff">
              Premium Car Care at Your Fingertips
            </ThemedText>
            <Pressable style={styles.ctaButton} onPress={handleBookNow}>
              <ThemedText style={styles.ctaButtonText} lightColor="#fff" darkColor="#fff">
                Book Now
              </ThemedText>
              <Ionicons name="arrow-forward" size={20} color="#fff" style={{
                textShadowColor: 'rgba(0, 0, 0, 0.3)',
                textShadowOffset: { width: 0, height: 1 },
                textShadowRadius: 2,
              }} />
            </Pressable>
          </ThemedView>
        </LinearGradient>

        {/* Services Section */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Our Services
          </ThemedText>
          
          <ThemedView style={styles.servicesGrid}>
            <Pressable style={[styles.serviceCard, { backgroundColor: cardColor, borderColor: borderColor }]} onPress={() => handleServicePress('Express Wash')}>
              <ThemedView style={[styles.serviceIcon, { backgroundColor: cardColor, borderColor: borderColor }]}>
                <Ionicons name="water" size={32} color={gradientStart} />
              </ThemedView>
              <ThemedView style={styles.serviceContent}>
                <ThemedText type="defaultSemiBold" style={styles.serviceTitle}>
                  Express Wash
                </ThemedText>
                <ThemedText style={styles.serviceDescription}>
                  Quick exterior wash & dry
                </ThemedText>
                <ThemedText style={styles.serviceFeatures}>
                  ⚡ 15 mins • Exterior • Vacuum
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.priceContainer}>
                <ThemedText style={styles.servicePrice} lightColor={gradientStart} darkColor={gradientStart}>
                  $15
                </ThemedText>
                <ThemedText style={styles.priceLabel}>
                  Basic
                </ThemedText>
              </ThemedView>
            </Pressable>

            <Pressable style={[styles.serviceCard, { backgroundColor: cardColor, borderColor: borderColor }]} onPress={() => handleServicePress('Premium Detail')}>
              <ThemedView style={[styles.serviceIcon, { backgroundColor: cardColor, borderColor: borderColor }]}>
                <Ionicons name="sparkles" size={32} color={gradientStart} />
              </ThemedView>
              <ThemedView style={styles.serviceContent}>
                <ThemedText type="defaultSemiBold" style={styles.serviceTitle}>
                  Premium Detail
                </ThemedText>
                <ThemedText style={styles.serviceDescription}>
                  Complete interior & exterior
                </ThemedText>
                <ThemedText style={styles.serviceFeatures}>
                  ✨ Deep Clean • Wax • Interior
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.priceContainer}>
                <ThemedText style={styles.servicePrice} lightColor={gradientStart} darkColor={gradientStart}>
                  $75
                </ThemedText>
                <ThemedText style={styles.priceLabel}>
                  Popular
                </ThemedText>
              </ThemedView>
            </Pressable>

            <Pressable style={[styles.serviceCard, { backgroundColor: cardColor, borderColor: borderColor }]} onPress={() => handleServicePress('Full Service')}>
              <ThemedView style={[styles.serviceIcon, { backgroundColor: cardColor, borderColor: borderColor }]}>
                <Ionicons name="star" size={32} color={gradientStart} />
              </ThemedView>
              <ThemedView style={styles.serviceContent}>
                <ThemedText type="defaultSemiBold" style={styles.serviceTitle}>
                  Full Service
                </ThemedText>
                <ThemedText style={styles.serviceDescription}>
                  Ultimate car care package
                </ThemedText>
                <ThemedText style={styles.serviceFeatures}>
                  👑 Everything • Ceramic • Protection
                </ThemedText>
              </ThemedView>
              <ThemedView style={styles.priceContainer}>
                <ThemedText style={styles.servicePrice} lightColor={gradientStart} darkColor={gradientStart}>
                  $120
                </ThemedText>
                <ThemedText style={styles.priceLabel}>
                  Premium
                </ThemedText>
              </ThemedView>
            </Pressable>
          </ThemedView>
        </ThemedView>

        {/* Features Section */}
        <ThemedView style={styles.section}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Why Choose Us
          </ThemedText>
          
          <ThemedView style={styles.featuresList}>
            <ThemedView style={[styles.featureItem, { backgroundColor: cardColor }]}>
              <Ionicons name="time" size={24} color={gradientStart} />
              <ThemedView style={styles.featureText}>
                <ThemedText type="defaultSemiBold">Quick Service</ThemedText>
                <ThemedText>In and out in 30 minutes</ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView style={[styles.featureItem, { backgroundColor: cardColor }]}>
              <Ionicons name="shield-checkmark" size={24} color={gradientStart} />
              <ThemedView style={styles.featureText}>
                <ThemedText type="defaultSemiBold">Eco-Friendly</ThemedText>
                <ThemedText>Biodegradable products</ThemedText>
              </ThemedView>
            </ThemedView>

            <ThemedView style={[styles.featureItem, { backgroundColor: cardColor }]}>
              <Ionicons name="diamond" size={24} color={gradientStart} />
              <ThemedView style={styles.featureText}>
                <ThemedText type="defaultSemiBold">Premium Quality</ThemedText>
                <ThemedText>Professional grade equipment</ThemedText>
              </ThemedView>
            </ThemedView>
          </ThemedView>
        </ThemedView>

        {/* Contact Section */}
        <ThemedView style={styles.contactSection}>
          <ThemedText type="subtitle" style={styles.sectionTitle}>
            Get in Touch
          </ThemedText>
          <Pressable style={[styles.contactButton, { borderColor: gradientStart }]} onPress={handleBookNow}>
            <Ionicons name="call" size={20} color={gradientStart} />
            <ThemedText style={styles.contactButtonText} lightColor={gradientStart} darkColor={gradientStart}>
              Call to Book
            </ThemedText>
          </Pressable>
        </ThemedView>
      </ScrollView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  scrollView: {
    flex: 1,
  },
  themeIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginTop: 12,
    marginHorizontal: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#e9ecef',
    backgroundColor: '#f8f9fa',
  },
  themeText: {
    fontSize: 12,
    fontWeight: '600',
  },
  heroSection: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  heroContent: {
    alignItems: 'center',
    gap: 16,
  },
  heroTitle: {
    textAlign: 'center',
    fontSize: 36,
    fontWeight: 'bold',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  heroSubtitle: {
    textAlign: 'center',
    fontSize: 16,
    opacity: 0.9,
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  ctaButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 25,
    gap: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '600',
    textShadowColor: 'rgba(0, 0, 0, 0.3)',
    textShadowOffset: { width: 0, height: 1 },
    textShadowRadius: 2,
  },
  section: {
    padding: 24,
  },
  sectionTitle: {
    marginBottom: 20,
    textAlign: 'center',
  },
  servicesGrid: {
    gap: 16,
  },
  serviceCard: {
    padding: 20,
    borderRadius: 16,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    borderWidth: 1,
  },
  serviceIcon: {
    width: 60,
    height: 60,
    borderRadius: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
  },
  serviceContent: {
    flex: 1,
    gap: 4,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  serviceDescription: {
    fontSize: 14,
    opacity: 0.7,
  },
  serviceFeatures: {
    fontSize: 12,
    opacity: 0.6,
    marginTop: 2,
  },
  priceContainer: {
    alignItems: 'flex-end',
    gap: 2,
  },
  servicePrice: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  priceLabel: {
    fontSize: 11,
    opacity: 0.5,
    textTransform: 'uppercase',
    letterSpacing: 0.5,
  },
  featuresList: {
    gap: 16,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    padding: 16,
    borderRadius: 12,
  },
  featureText: {
    flex: 1,
  },
  contactSection: {
    padding: 24,
    alignItems: 'center',
  },
  contactButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 25,
    borderWidth: 2,
  },
  contactButtonText: {
    fontSize: 16,
    fontWeight: '600',
  },
});
