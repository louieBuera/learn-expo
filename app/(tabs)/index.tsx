import { Text, View } from "react-native";
import {Link} from "expo-router";

export default function Index() {
  return (
    <View
      className="flex-1 justify-center items-center"
    >
      <Text className="text-5xl text-dark-200  font-bold">
        Hello World!
      </Text>
      <Link className="text-2xl" href="/profile">Profile</Link>
      <Link className="text-2xl" href="/saved">Saved</Link>
      <Link className="text-2xl" href="/search">Search</Link>

      <Link className="text-2xl" href={{
        pathname: "/movie/[id]",
        params: { id: 'avengers' }
      }}>Avenger Movie</Link>
    </View>
  );
}
