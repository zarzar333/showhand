import react, { useContext, useState } from 'react';
import { AppContext } from '../context/AppContext';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Checkbox from '@mui/material/Checkbox';
import CircleCheckedFilled from '@mui/icons-material/CheckCircle';
import CircleUnchecked from '@mui/icons-material/RadioButtonUnchecked';
import ExpandLess from '@mui/icons-material/ExpandLess';
import ExpandMore from '@mui/icons-material/ExpandMore';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import Collapse from '@mui/material/Collapse';
import { palette1 } from '../colors';
import { Nearby } from '../data/Nearby';
import PlaceIcon from '@mui/icons-material/Place';
import { useTranslation } from 'react-i18next';

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

interface TypefiltersProps {
  nearbys: Nearby[],
}

export default function TypeFilters({ nearbys } : TypefiltersProps) {

  return (
    <List>
      {
        filters.map((type) => (
          <TypeFilter type={type} key={type} nearbys={nearbys.filter((nearbys)=>nearbys.设施类型 == type) }/>
        ))
      }
    </List>
  )    
}

interface TypeFilterProps {
  type: string,
  nearbys: Nearby[]
}

function TypeFilter({ type, nearbys } : TypeFilterProps) {

  const { selectedTypes, setSelectedTypes, setSelectedNearbyId } = useContext(AppContext);
  const [isOpen, setIsOpen] = useState(false);
  const { t } = useTranslation();

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
    <>
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
        <ListItemButton onClick={(_) => {
          setIsOpen(!isOpen);
        }}>
          <ListItemText primary={t(type)} />
          {isOpen ? <ExpandLess /> : <ExpandMore />}
        </ListItemButton>
      </ListItem>
      <Collapse in={isOpen} timeout="auto" unmountOnExit>
        {
          nearbys.map((nearby) =>  
          (<List component="div" disablePadding key={nearby.名称}>  
            <ListItemButton sx={{ pl: 4 }} onClick={ (_) => { setSelectedNearbyId(nearby.id)}}>
              <ListItemIcon >
                <PlaceIcon sx={{ color: palette1.get(nearby.设施类型) }}/>
              </ListItemIcon>
              <ListItemText
                secondary={nearby.名称}
                secondaryTypographyProps={{ 
                  noWrap: true,
                }}  />
            </ListItemButton>
          </List>)
          )
        }
      </Collapse>
    </>
  )
}