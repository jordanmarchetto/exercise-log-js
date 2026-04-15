import { Link, useLocalSearchParams } from 'expo-router';
import { useEffect, useState } from 'react';
import { ActivityIndicator, Pressable, StyleSheet, Text, View } from 'react-native';

type Exercise = {
  id: number;
  name: string;
  description: string | null;
  icon: string | null;
  created_at: string;
  updated_at: string;
  show_on_records: boolean;
};

const API_URL = process.env.EXPO_PUBLIC_API_URL ?? 'http://localhost:3000';

export default function ExerciseDetailsScreen() {
  const { id } = useLocalSearchParams<{ id?: string | string[] }>();
  const exerciseId = Array.isArray(id) ? id[0] : id;

  const [exercise, setExercise] = useState<Exercise | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadExercise = async () => {
      if (!exerciseId) {
        setError('Missing exercise id.');
        setLoading(false);
        return;
      }

      try {
        setError(null);
        const response = await fetch(`${API_URL}/exercises/${exerciseId}`);

        if (response.status === 404) {
          setExercise(null);
          setError('Exercise not found.');
          return;
        }

        if (!response.ok) {
          throw new Error(`Request failed with status ${response.status}`);
        }

        const data = (await response.json()) as Exercise;
        setExercise(data);
      } catch (loadError) {
        setError(loadError instanceof Error ? loadError.message : 'Failed to load exercise');
      } finally {
        setLoading(false);
      }
    };

    loadExercise();
  }, [exerciseId]);

  return (
    <View style={styles.container}>
      <Link href="/" asChild>
        <Pressable style={styles.backLink}>
          <Text style={styles.backLinkText}>Back to list</Text>
        </Pressable>
      </Link>

      {loading ? (
        <View style={styles.centered}>
          <ActivityIndicator color="#f97316" />
        </View>
      ) : error ? (
        <View style={styles.centered}>
          <Text style={styles.error}>{error}</Text>
        </View>
      ) : exercise ? (
        <View style={styles.card}>
          <Text style={styles.kicker}>Exercise details</Text>
          <Text style={styles.title}>{exercise.name}</Text>
          <Text style={styles.description}>
            {exercise.description ?? 'No description yet.'}
          </Text>

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Visible on records</Text>
            <Text style={styles.metaValue}>{exercise.show_on_records ? 'Yes' : 'No'}</Text>
          </View>

          <View style={styles.metaRow}>
            <Text style={styles.metaLabel}>Icon</Text>
            <Text style={styles.metaValue}>{exercise.icon ?? 'None'}</Text>
          </View>
        </View>
      ) : null}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#0f172a',
    padding: 20,
    gap: 16,
  },
  backLink: {
    alignSelf: 'flex-start',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 999,
    backgroundColor: '#1f2937',
  },
  backLinkText: {
    color: '#f8fafc',
    fontWeight: '700',
  },
  centered: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    padding: 18,
    gap: 12,
  },
  kicker: {
    color: '#fb923c',
    textTransform: 'uppercase',
    letterSpacing: 1.4,
    fontSize: 12,
    fontWeight: '700',
  },
  title: {
    color: '#f8fafc',
    fontSize: 30,
    lineHeight: 34,
    fontWeight: '800',
  },
  description: {
    color: '#cbd5e1',
    fontSize: 16,
    lineHeight: 24,
  },
  metaRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    gap: 12,
    paddingTop: 8,
    borderTopWidth: 1,
    borderTopColor: '#1f2937',
  },
  metaLabel: {
    color: '#94a3b8',
    fontSize: 14,
  },
  metaValue: {
    color: '#f8fafc',
    fontSize: 14,
    fontWeight: '700',
  },
});
