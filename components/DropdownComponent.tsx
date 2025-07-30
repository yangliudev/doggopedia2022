import React, {useState, useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Dropdown} from 'react-native-element-dropdown';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

interface DropdownItem {
  label: string;
  value: number;
}

interface DropdownComponentProps {
  navigation: any;
  _dropdownData?: {key: string; value: string}[];
}

const DropdownComponent: React.FC<DropdownComponentProps> = ({navigation}) => {
  const [value, setValue] = useState<DropdownItem | null>(null);
  const [isFocus, setIsFocus] = useState(false);

  const [dropdownList, setdropdownList] = useState<DropdownItem[]>([]);

  // JSON data scraped off of Wikipedia's Dog Breeds List
  const wikiJsonObj = require('../api/cleanedData.json');
  const wikiJsonString = wikiJsonObj[0]?.dogBreeds;

  const populateDropdownList = React.useCallback(() => {
    const jsonDataArray = wikiJsonString ? wikiJsonString.split(',') : [];
    const data: DropdownItem[] = [];

    for (let i = 0; i < jsonDataArray.length; i++) {
      const breed = jsonDataArray[i];
      if (breed && breed.trim()) {
        data.push({label: breed.trim(), value: i});
      }
    }

    setdropdownList(data);
  }, [wikiJsonString]);

  useEffect(() => {
    if (dropdownList.length === 0) {
      populateDropdownList();
    }
    return () => {
      console.log('clean up');
    };
  }, [dropdownList.length, populateDropdownList]);

  const evalSelectedText = (dogName: string) => {
    console.log('SELECTED IS ', dogName);
    navigation.navigate('DogInfoScreen', {dogName: dogName});
  };

  return (
    <View style={styles.container}>
      {/* {renderLabel()} */}
      <Dropdown
        style={[styles.dropdown, isFocus && styles.dropdownFocused]}
        placeholderStyle={styles.placeholderStyle}
        selectedTextStyle={styles.selectedTextStyle}
        inputSearchStyle={styles.inputSearchStyle}
        iconStyle={styles.iconStyle}
        itemTextStyle={styles.itemTextStyle}
        data={dropdownList}
        search
        maxHeight={300}
        labelField="label"
        valueField="value"
        placeholder={!isFocus ? 'choose doggo' : '...'}
        searchPlaceholder="Search..."
        value={value}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setValue(item);
          setIsFocus(false);
          evalSelectedText(item.label);
        }}
        renderLeftIcon={() => (
          <MaterialCommunityIcons
            style={styles.icon}
            color={isFocus ? 'blue' : 'black'}
            name="dog"
            size={20}
          />
        )}
      />
    </View>
  );
};

export default DropdownComponent;

const styles = StyleSheet.create({
  container: {
    padding: 16,
  },
  dropdown: {
    height: 50,
    width: 200,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  dropdownFocused: {
    borderColor: 'blue',
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
    color: '#000',
  },
  selectedTextStyle: {
    fontSize: 16,
    color: '#000',
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
    color: '#000',
  },
  itemTextStyle: {
    color: '#000',
  },
});
