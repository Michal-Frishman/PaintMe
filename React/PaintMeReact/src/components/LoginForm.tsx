import { useState } from 'react';
import { Box, Button, Checkbox, FormControlLabel, TextField, Typography } from '@mui/material';

function PaintMeLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleSubmit = (e:any) => {
    e.preventDefault();
  };

  return (
    <Box sx={styles.body}>
      <Box sx={styles.header}>
        <Typography variant="h4" sx={styles.logo}>
          Paint<span style={styles.logoSpan}>Me</span> 
          <span style={styles.logoIcon}>🎨</span>
        </Typography>
        <Typography variant="subtitle1" sx={styles.subtitle}>עולם של צבע וקסם</Typography>
      </Box>
      
      <Box sx={styles.container}>
        <Box sx={styles.formSection}>
          <Typography variant="h5" sx={styles.h1}>התחברות</Typography>
          <Typography sx={styles.p}>הקלד את השם והסיסמה כדי להתחבר</Typography>
          
          <form onSubmit={handleSubmit}>
            <Box sx={styles.formGroup}>
              <TextField 
                label="Email" 
                type="email" 
                required 
                fullWidth 
                sx={styles.input}
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </Box>
            
            <Box sx={styles.formGroup}>
              <TextField 
                label="סיסמה" 
                type="password" 
                required 
                fullWidth 
                sx={styles.input}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </Box>
            
            <FormControlLabel 
              control={
                <Checkbox 
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
              } 
              label="זכור אותי" 
              sx={styles.checkboxGroup}
            /> 
           
            <Typography sx={styles.forgotPassword}>
              <a href="#" style={styles.a}>שכחת סיסמה?</a>
            </Typography>
            
            <Button type="submit" variant="contained" sx={styles.btn}>
              התחברות
            </Button>
          </form>
          
          <Typography sx={styles.registerLink}>
            <a href="#" style={styles.a}>אין לך חשבון? הרשם</a>
          </Typography>
        </Box>
        
        <Box sx={styles.graphicSection}>
          <div style={styles.lockIcon}>🔒</div>
        </Box>
      </Box>
    </Box>
  );
}

// הגדרות הסגנון
const styles = {
  body: {
    margin: 0,
    padding: 0,
    boxSizing: 'border-box',
    fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
    background: 'linear-gradient(135deg, #e0f2fe 0%, #f5d0fe 100%)',
    height: '100vh',
    direction: 'rtl',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center', // מרכז את התוכן
    alignItems: 'center', // מרכז את התוכן
  },
  
  header: {
    background: 'linear-gradient(135deg, #c4b5fd 0%, #f5d0fe 100%)',
    padding: '20px 0',
    textAlign: 'center',
    boxShadow: '0 2px 10px rgba(0, 0, 0, 0.1)',
    width: '100%', // אפשר את הרוחב
  },
  
  logo: {
    fontSize: '2.5rem',
    fontWeight: 'bold',
    color: '#7c3aed'
  },
  
  logoSpan: {
    color: '#f43f5e'
  },
  
  logoIcon: {
    fontSize: '1.5rem',
    verticalAlign: 'middle',
    marginRight: '8px'
  },
  
  subtitle: {
    color: '#444',
    fontSize: '1rem',
    marginTop: '5px'
  },
  
  container: {
    maxWidth: '600px', // הגבלת רוחב
    width: '100%', // שימוש ברוחב מלא
    margin: '50px auto',
    display: 'flex',
    backgroundColor: '#fff',
    borderRadius: '15px',
    overflow: 'hidden',
    flexDirection: 'column',
    boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1)',
  },
  
  formSection: {
    flex: 1,
    padding: '40px',
    backgroundColor: '#f0f9ff',
    color: '#334155'
  },
  
  graphicSection: {
    flex: 1,
    background: 'linear-gradient(135deg, #dbeafe 0%, #fbcfe8 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  
  lockIcon: {
    width: '200px',
    height: '200px',
    backgroundColor: 'white',
    borderRadius: '25px',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    fontSize: '120px',
    boxShadow: '0 15px 35px rgba(0, 0, 0, 0.1)'
  },
  
  h1: {
    fontSize: '2rem',
    marginBottom: '8px',
    color: '#7c3aed'
  },
  
  p: {
    marginBottom: '25px',
    fontSize: '0.9rem',
    color: '#64748b'
  },
  
  formGroup: {
    marginBottom: '20px'
  },
  
  input: {
    width: '100%',
    padding: '12px 15px',
    border: '1px solid #e2e8f0',
    borderRadius: '8px',
    fontSize: '1rem',
    transition: 'border-color 0.3s',
    backgroundColor: '#fff',
  },
  
  checkboxGroup: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: '15px'
  },
  
  forgotPassword: {
    textAlign: 'left',
    marginBottom: '25px'
  },
  
  btn: {
    display: 'block',
    width: '100%',
    padding: '12px',
    backgroundColor: '#7c3aed',
    color: 'white',
    border: 'none',
    borderRadius: '8px',
    fontSize: '1rem',
    fontWeight: 'bold',
    cursor: 'pointer',
    transition: 'background-color 0.3s',
  },
  
  registerLink: {
    textAlign: 'center',
    marginTop: '20px',
    fontSize: '0.9rem'
  },
  
  a: {
    color: '#7c3aed',
    textDecoration: 'none'
  }
};

export default PaintMeLogin;
