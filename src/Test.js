import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useCallback, useEffect, useMemo, useState} from 'react';

export default function Test() {
  const [count, setCount] = useState(0);
  const [item, setItem] = useState(10);

  // useMemo
  const exampleMemo = useMemo(
    function multicount() {
      return count * 2;
    },
    [count],
  );

  // useCallBack
  const exampleCallBack = useCallback(
    function () {
      return count * 5;
    },
    [count],
  );

  useEffect(() => {
    console.log('useEffect');
  }, []);

  return (
    <View style={styles.main}>
      <Text>Test</Text>
      <Text style={{fontSize: 30}}>{count}</Text>
      <Button title="Increment" onPress={() => setCount(count + 1)} />
      <Text style={{fontSize: 30}}>{item}</Text>
      <Button title="Increment" onPress={() => setItem(item * 2)} />
      <Text style={{fontSize: 30}}>{exampleMemo}</Text>
      <Text style={{fontSize: 30}}>{exampleCallBack()}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
