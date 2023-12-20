import { useEffect, useState } from 'react';
import './styles.css';
import { useStore } from '../../store';

export const SnackBar = () => {
  const { showSnackbar, snackbarMsg, snackbarMsgType, setHideSnackbar } = useStore();
  const [bottom, setBottom] = useState(-60);

  useEffect(() => {
    if (showSnackbar) {
      setBottom(10)
      setTimeout(() => {
        setBottom(-60)
        setHideSnackbar()
      }, 3500)
    } else {
      setBottom(-60)
    }
  }, [showSnackbar]);

  const getColor = () => {
    switch (snackbarMsgType) {
      case "success":
        return "rgb(56, 142, 60)";
      case "error":
        return "rgb(211, 47, 47)";
      case "warning":
        return "rgb(245, 124, 0)"
      default:
        return "rgb(2, 136, 209)";
    }
  };

  return (
    <div className="snackbar" style={{ bottom }}>
      <div className='snackbar-content' style={{ backgroundColor: getColor() }}>
        <p>{snackbarMsg}</p>
      </div>
    </div>
  )
}