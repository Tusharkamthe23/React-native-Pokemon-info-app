import { Stack, useLocalSearchParams } from "expo-router";
import { useEffect, useState } from "react";
import { Image, ScrollView, Text, View, StyleSheet, ActivityIndicator } from "react-native";

interface PokemonDetails {
  name: string;
  image: string;
  imageBack: string;
  types: string[];
  height: number;
  weight: number;
}

export default function Details() {
  const { name } = useLocalSearchParams();
  const [pokemon, setPokemon] = useState<PokemonDetails | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (name) fetchPokemonByName(name as string);
  }, [name]);

  async function fetchPokemonByName(name: string) {
    try {
      const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`);
      const details = await res.json();

      setPokemon({
        name: details.name,
        image: details.sprites.front_default,
        imageBack: details.sprites.back_default,
        types: details.types.map((t: any) => t.type.name),
        height: details.height,
        weight: details.weight,
      });
    } catch (e) {
      console.log("Error fetching Pokémon:", e);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return <ActivityIndicator size="large" style={{ flex: 1 }} />;
  }

  if (!pokemon) {
    return <Text style={{ textAlign: "center", marginTop: 50 }}>No Data Found</Text>;
  }

  return (
    <>
      <Stack.Screen options={{ title: pokemon.name }} />
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.name}>{pokemon.name}</Text>
        
        <View style={styles.imageContainer}>
          <Image source={{ uri: pokemon.image }} style={styles.image} />
          <Image source={{ uri: pokemon.imageBack }} style={styles.image} />
        </View>

        <Text style={styles.info}>Types: {pokemon.types.join(", ")}</Text>
        <Text style={styles.info}>Height: {pokemon.height}</Text>
        <Text style={styles.info}>Weight: {pokemon.weight}</Text>
      </ScrollView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 20,
    alignItems: "center",
   
  },
  name: {
    fontSize: 32,
    fontWeight: "bold",
    textTransform: "capitalize",
  
  },
  imageContainer: {
    flexDirection: "row",
    gap: 20,
    marginVertical: 20,
  },
  image: {
    width: 150,
    height: 150,
  },
  info: {
    fontSize: 20,
    marginVertical: 6,
  },
});
