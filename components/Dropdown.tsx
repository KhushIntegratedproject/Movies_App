// File: components/Dropdown.tsx
import DropDownPicker from 'react-native-dropdown-picker';
import { StyleSheet } from 'react-native';

export default function Dropdown({ open, setOpen, value, setValue, items, setItems }: any) {
  return (
    <DropDownPicker
      open={open}
      value={value}
      items={items}
      setOpen={setOpen}
      setValue={setValue}
      setItems={setItems}
      placeholder="Select category"
      style={styles.dropdown}
      zIndex={1000}
      zIndexInverse={3000}
    />
  );
}

const styles = StyleSheet.create({
  dropdown: {
    marginBottom: 10,
  },
});
