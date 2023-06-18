import { TouchableOpacity } from 'react-native';
import Ionicons from '@expo/vector-icons/Ionicons';

export default function Search({ onPress }) {
  
  return (
    <TouchableOpacity style={{ paddingEnd: 5 }} onPress={onPress}>
      <Ionicons name="search-outline" size={30} />
    </TouchableOpacity>
  );
}