import React, { useEffect, useState } from 'react';
import { View,TouchableOpacity,Text } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { datePicker } from '../Constant';
const DatePicker:React.FC<datePicker> = ({item,getDateformPicker}) => {
  const [date, setDate]:any= useState(new Date().getTime());
  const [show, setShow] = useState(false);
  useEffect(()=>{setDate(item)},[item])
  const onChange:any = (event:any, selectedDate:string) => {
    const currentDate = selectedDate || date;
    setShow(false);
    getDateformPicker( new Date(currentDate).getTime())
    setDate( new Date(currentDate).getTime());
  };
  function epochToDateString(epoch:any,key?:any) {
    const date = new Date(parseInt(epoch));
    const day = String(date.getDate()).padStart(2, '0');
    const month = String(date.getMonth()).padStart(2, '0');
    const monthDup = String(date.getMonth()+1).padStart(2, '0');
    const year:any = date.getFullYear();
    if(key==="picker") return new Date(parseInt(year),parseInt(month),parseInt(day))
    return `${day}/${monthDup}/${year}`;
  }

  return (
    <View>
      <TouchableOpacity onPress={()=>setShow(true)} className='w-full text-base mt-4 px-4 py-2 border border-green-400 rounded-lg bg-white'  >
        <Text>{epochToDateString(date) as string}</Text>
      </TouchableOpacity>
      {show && (
        <DateTimePicker
          testID="dateTimePicker"
          value={epochToDateString(date,'picker')as Date}
          is24Hour={true}
          display="default"
          onChange={onChange}
        />
      )}
    </View>
  );
};
export default DatePicker;