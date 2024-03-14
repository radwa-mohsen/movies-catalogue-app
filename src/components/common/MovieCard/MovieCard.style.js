import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';

const StyledGrid = styled(Grid)(({ theme }) => ({
  '& .movieCard': {
    display: 'flex',
    flexDirection: 'column',
    height: '100%',
    backgroundColor: '#fff',
    color: 'rgba(0, 0, 0, 0.87)',
    transition: 'box-shadow 300ms cubic-bezier(0.4, 0, 0.2, 1), all 0.3s ease',
    borderRadius: 4,
    boxShadow:
      '0px 2px 1px -1px rgba(0,0,0,0.2), 0px 1px 1px 0px rgba(0,0,0,0.14), 0px 1px 3px 0px rgba(0,0,0,0.12)',
    overflow: 'hidden',
    '&:hover': {
      [theme.breakpoints.up('md')]: {
        cursor: 'pointer',
        transform: 'scale(105%)',
        opacity: 0.5,
      },
    },
  },
  '& .movieCardHeader': {
    display: 'flex',
    alignItems: 'center',
    padding: 16,
  },
  '& .cardHeaderContent': {
    flex: '1 1 auto',
  },
  '& .cardHeaderTitle': {
    fontSize: 16,
    fontWeight: 'bold',
    whiteSpace: 'nowrap',
  },
  '& .cardHeaderSubtitle': {
    color: 'rgba(0, 0, 0, 0.6)',
    fontWeight: 400,
  },
  '& .cardImage': {
    display: 'block',
    backgroundSize: 'cover',
    backgroundRepeat: 'no-repeat',
    backgroundPosition: 'center',
    width: '100%',
    objectFit: 'cover',
    overflowClipMargin: 'content-box',
    overflow: 'clip',
  },
  '& .cardContent': {
    flexGrow: 1,
    padding: 16,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  '& .cardContentSubtitle': {
    color: 'rgba(0, 0, 0, 0.6)',
  },
}));
export default StyledGrid;
