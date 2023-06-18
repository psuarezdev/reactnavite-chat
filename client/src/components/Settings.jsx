import { TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';

import Ionicons from '@expo/vector-icons/Ionicons';

export default function Search() {
  
  const { navigate } = useNavigation();

  return (
    <TouchableOpacity style={{ paddingEnd: 5 }} onPress={() => navigate('Profile')}>
      <Ionicons name="settings-outline" size={30} />
    </TouchableOpacity>
  );
}