import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const Contact = ({contact, userId, user}) => {
    if(!contact) {
        return null;
    }
console.log(userId)

    const handleFriendRequest = async () =>{
        const token = await AsyncStorage.getItem('authToken');

        let contactPhoneNumber;
    for (let i = 0; i < contact.phoneNumbers.length; i++) {
      if (contact.phoneNumbers[i].digits) {
        contactPhoneNumber = contact.phoneNumbers[i].digits;
        break;
      }
    }
   
    if (!contactPhoneNumber) {
      console.error('No valid phone number found for this contact');
      return;
    }
        const data = { requester_id: userId, requested_id: user.id }; // replace with actual requester_id and requested_id
        const response = await fetch('http://10.129.3.45:5555/friend_requests', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify(data),
        });
    
        if (!response.ok) {
          const errorData = await response.json();
          console.error(errorData);
        } else {
          console.log('Friend request sent successfully');
        }
      };
  return (
<View style={styles.contactCon}>
<View style={styles.imgCon}>
  <View style={styles.placeholder}>
    <Text style={styles.txt}>
      {contact?.name[0] || ''}
    </Text>
  </View>
</View>
<View style={styles.contactDat}>
        <Text style={styles.name}>{contact?.name}</Text>
        {contact?.phoneNumbers && contact?.phoneNumbers.map((phoneNumber) => (
          <Text style={styles.phoneNumber} key={phoneNumber.id}>
            {phoneNumber.number}
          </Text>
  ))}
</View>
<TouchableOpacity style={styles.addButton} onPress={handleFriendRequest}>
    <Text>Add</Text>
</TouchableOpacity>
</View>
);
};
const styles = StyleSheet.create({
  contactCon: {
    flex: 1,
    flexDirection: 'row',
    padding: 5,
    borderBottomWidth: 0.5,
    borderBottomColor: '#d9d9d9',
  },
  imgCon: {},
  placeholder: {
    width: 55,
    height: 55,
    borderRadius: 30,
    overflow: 'hidden',
    backgroundColor: '#d9d9d9',
    alignItems: 'center',
    justifyContent: 'center',
  },
  contactDat: {
    flex: 1,
    justifyContent: 'center',
    paddingLeft: 5,
    backgroundColor: '#fff'
  },
  txt: {
    fontSize: 18,
  },
  name: {
    fontSize: 16,
  },
  phoneNumber: {
    color: '#888',
  },
  addButton: {
    backgroundColor: '#f5793b',
    width: 50,
    height: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    borderTopRightRadius: 5,
    borderBottomRightRadius: 5,
  },
  buttonText: {
   color: '#0d0f13',
   fontSize: 16,
   fontWeight: "bold"
  },
});
export default Contact;