import React, { useEffect, useState } from 'react';
import { View, Text, FlatList, ActivityIndicator } from 'react-native';
import axios from 'axios';
import Customer from './Customer';

const CustomerList = (props) => {
  const [customers, setCustomers] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get('https://615f5fb4f7254d0017068109.mockapi.io/api/v1/customers/');
        setCustomers(response.data);
        setIsLoading(false);
      } catch (error) {
        console.error(error);
      }
    };
    fetchData();
  }, []);

  if (isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <View style={{ flex: 1, paddingLeft: 20, paddingRight: 20 }}>
      <FlatList
        data={customers}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
            <Customer
                name={item.name}
                username={item.username}
                address={item.address}
                profile={item.profile}
                company={item.company}
                orders={item.orders.length}
                id={item.id}
            />     
        )}
      />
    </View>
  );
};

export default CustomerList;
