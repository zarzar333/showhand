import react, { useContext } from 'react';
import { AppContext } from '../context/AppContext';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import CircleCheckedFilled from '@mui/icons-material/CheckCircle';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import { palette1 } from '../colors';

const filters = [  
  'レストラン',
  'カフェ',
  'ドラックストア',
  '総合病院',
  '学校',
  'ジム',
  'コンビニ',
  '公園',
  'バス停',
  'クリニック',
  'スーパー',
  '体育館'
]

export default function TypeFilters() {
  const { selectedTypes, setSelectedTypes } = useContext(AppContext);

  function getOnChangeFunction(event: React.ChangeEvent<HTMLInputElement>) {
    const type = event.target.value;
    if (event.target.checked) {
      if (!selectedTypes.includes(type)) {
        setSelectedTypes([...selectedTypes, type].sort());
      } 
    } else {
      setSelectedTypes(selectedTypes.filter((x) => x !== type));
    }
  }

  return (

    <List>
      {
        filters.map((type) => (
          <ListItem dense key={type}>
            <Checkbox
              icon={<CircleUnchecked />}
              checkedIcon={<CircleCheckedFilled />}
              size='small'
              value={type}
              checked={selectedTypes.includes(type)}
              onChange={getOnChangeFunction}
              inputProps={{ 'aria-label': type }}
              sx={{ color: palette1.get(type), '&.Mui-checked': { color: palette1.get(type) } }}
            />
            <ListItemText primary={type} />
          </ListItem>
        ))
      }
    </List>
  )    
}