import { View, Text, TouchableOpacity, Image } from 'react-native'
import { Link } from 'expo-router';
import MaskedView from '@react-native-masked-view/masked-view';
import React from 'react'
import { images } from '@/constants/images';

interface Props {
  movie: TrendingMovie,
  index: number
} 

const TrendingCard = ({
  movie: { movie_id, title, poster_url },index
}: Props) => {
  return (
    <Link href={{
      pathname: '/movie/[id]',
      params: { id: movie_id }
    }} asChild>
      <TouchableOpacity className="w-48 relative pl-5">
        <Image
          source={{uri: poster_url}}
          className='w-40 h-72 rounded-lg'
          resizeMode="cover"
        />

        <View className="absolute bottom-9 -left-3.5 px-2 py-1 rounded-full">
          {/* <Text className="text-white">{ index }</Text> */}
          <MaskedView maskElement={
            <Text className='font-bold text-white text-6xl'>{ index + 1}</Text>
          }>
            <Image source={images.rankingGradient}
              className='size-14' resizeMode='cover'
            />
          </MaskedView>
        </View>

        <Text className="text-sm font-bold mt-2 text-light-200"
          numberOfLines={2}
        >
          { title }
        </Text>
      </TouchableOpacity>
    </Link>
  )
}

export default TrendingCard