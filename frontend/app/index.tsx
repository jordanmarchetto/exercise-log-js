import { Link } from 'expo-router';
import { useEffect, useState } from 'react';
import {
    ActivityIndicator,
    FlatList,
    Pressable,
    StyleSheet,
    Text,
    View,
} from 'react-native';

type Exercise = {
  id: number;
  name: string;
  description: string | null;
  icon: string | null;
  created_at: string;
  updated_at: string;
  show_on_records: boolean;
};

type ExerciseListResponse = {
  exercises: Exercise[];
};

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

export default function HomeScreen() {
  const [exercises, setExercises] = useState<Exercise[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadExercises = async () => {
    try {
      setError(null);
      console.log('Fetching exercises from API at', API_URL);
      const response = await fetch(`${API_URL}/exercises`);

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const data = (await response.json()) as ExerciseListResponse;
      setExercises(data.exercises);
    } catch (loadError) {
      setError(loadError instanceof Error ? loadError.message : 'Failed to load exercises');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadExercises();
  }, []);

  return (
    <FlatList
      contentContainerStyle={styles.content}
      data={exercises}
      keyExtractor={(item) => String(item.id)}
      onRefresh={loadExercises}
      refreshing={loading}
      ListHeaderComponent={
        <View style={styles.header}>
          <Text style={styles.kicker}>Exercise Log</Text>
          <Text style={styles.subtitle}>
            This screen reads directly from the API and shows the current list of exercises.
          </Text>
        </View>
      }
      ListEmptyComponent={
        <View style={styles.emptyState}>
          {loading ? (
            <ActivityIndicator color="#f97316" />
          ) : error ? (
            <Text style={styles.error}>{error}</Text>
          ) : (
            <Text style={styles.emptyText}>No exercises found.</Text>
          )}
        </View>
      }
      renderItem={({ item }) => (
        <Link href={`/exercises/${item.id}`} asChild>
          <Pressable style={({ pressed }) => [styles.card, pressed && styles.cardPressed]}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>{item.name}</Text>
              <Text style={styles.cardBadge}>{item.show_on_records ? 'Visible' : 'Hidden'}</Text>
            </View>
            <Text style={styles.cardText} numberOfLines={2}>
              {item.description ?? 'No description yet.'}
            </Text>
          </Pressable>
        </Link>
      )}
    />
  );
}

const styles = StyleSheet.create({
  content: {
    padding: 20,
    paddingBottom: 32,
    gap: 16,
    backgroundColor: '#0f172a',
  },
  header: {
    gap: 10,
    paddingBottom: 8,
  },
  kicker: {
    color: '#fb923c',
    textTransform: 'uppercase',
    letterSpacing: 1.6,
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    color: '#f8fafc',
    fontSize: 34,
    lineHeight: 38,
    fontWeight: '800',
  },
  subtitle: {
    color: '#cbd5e1',
    fontSize: 16,
    lineHeight: 24,
  },
  emptyState: {
    minHeight: 160,
    alignItems: 'center',
    justifyContent: 'center',
  },
  emptyText: {
    color: '#cbd5e1',
  },
  error: {
    color: '#fca5a5',
    textAlign: 'center',
  },
  card: {
    backgroundColor: '#111827',
    borderColor: '#1f2937',
    borderWidth: 1,
    borderRadius: 18,
    padding: 16,
    gap: 10,
  },
  cardPressed: {
    opacity: 0.7,
    transform: [{ scale: 0.99 }],
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
  },
  cardTitle: {
    flex: 1,
    color: '#f8fafc',
    fontSize: 18,
    fontWeight: '700',
  },
  cardBadge: {
    color: '#fdba74',
    fontSize: 12,
    fontWeight: '700',
    textTransform: 'uppercase',
    letterSpacing: 0.8,
  },
  cardText: {
    color: '#cbd5e1',
    lineHeight: 20,
  },
});
