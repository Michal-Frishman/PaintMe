import React from "react"

import { useState, useRef, type FormEvent } from "react"
import {
  Box,
  Button,
  TextField,
  Typography,
  Paper,
  Tabs,
  Tab,
  InputAdornment,
  IconButton,
  Divider,
  Alert,
  CircularProgress,
  FormHelperText,
} from "@mui/material"
import { Visibility, VisibilityOff, Email, Lock, Google } from "@mui/icons-material"
import axios from "axios"
import { useNavigate } from "react-router-dom"
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth"
import { auth } from "../pages/firebase" // Make sure this path is correct
import emailjs from '@emailjs/browser';

export default function AuthPage() {
  const [mode, setMode] = useState<"login" | "register">("login")
  const [showPassword, setShowPassword] = useState(false)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [success, setSuccess] = useState<string | null>(null)

  const emailRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const navigate = useNavigate()

  const handleModeChange = (_event: React.SyntheticEvent, newValue: "login" | "register") => {
    setMode(newValue)
    setError(null)
  }

  const validateForm = () => {
    if (!emailRef.current?.value) {
      setError("נא להזין כתובת אימייל")
      return false
    }

    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailPattern.test(emailRef.current.value)) {
      setError("נא להזין כתובת אימייל תקינה")
      return false
    }

    if (!passwordRef.current?.value) {
      setError("נא להזין סיסמה")
      return false
    }

    if (mode === "register" && passwordRef.current.value.length < 6) {
      setError("הסיסמה חייבת להכיל לפחות 6 תווים")
      return false
    }

    return true
  }

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault()

    if (!validateForm()) return

    setLoading(true)
    setError(null)

    const url = `${import.meta.env.VITE_API_URL}/api/Auth/${mode}`

    try {
      const res = await axios.post(url, {
        Email: emailRef.current?.value,
        Password: passwordRef.current?.value,
      })

      const token = res.data.token
      sessionStorage.setItem("token", token)
      console.log(emailRef.current?.value);

      setSuccess(mode === "login" ? "התחברת בהצלחה!" : "נרשמת בהצלחה!")
      if (mode === "register") {
        await emailjs.send(
          'PaintMe!123',
          'template_v9kcgm5',
          {
            email: emailRef.current?.value,
          },
          "PLoLH7V1mxp0HGHAK")
      }
      setTimeout(() => {
        navigate("/")
      }, 1500)
    } catch (e: any) {
      console.error("Error:", e)

      if (e.response?.status === 400) {
        setError("משתמש כבר קיים במערכת, אנא התחבר")
      } else if (e.response?.status === 401) {
        setError("אימייל או סיסמה שגויים")
      } else {
        setError("אירעה שגיאה, אנא נסה שוב מאוחר יותר")
      }
    } finally {
      setLoading(false)
    }
  }

  const handleGoogleAuth = async () => {
    setLoading(true)
    setError(null)

    const provider = new GoogleAuthProvider()

    try {
      const result = await signInWithPopup(auth, provider)
      const email = result.user.email

      if (!email) {
        throw new Error("לא התקבל אימייל מחשבון Google")
      }

      const url = `${import.meta.env.VITE_API_URL}/api/Auth/${mode}`
      const password = "GoogleAuth123!" 

      const res = await axios.post(url, {
        Email: email,
        Password: password,
      })

      const token = res.data.token
      sessionStorage.setItem("token", token)

      setSuccess(mode === "login" ? "התחברת בהצלחה עם Google!" : "נרשמת בהצלחה עם Google!")

      // setTimeout(() => {
        navigate("/")
      // }, 1500)
    } catch (err) {
      console.error("Google Sign-In error:", err)
      setError("שגיאה בהתחברות עם Google")
    } finally {
      setLoading(false)
    }
  }

  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        // background: "linear-gradient(135deg, #f5f7ff 0%, #e6f0ff 100%)",
        padding: 2,
      }}
    >
      <Paper
        elevation={3}
        sx={{
          width: "100%",
          maxWidth: 450,
          borderRadius: 4,
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Box
          sx={{
            bgcolor: "primary.main",
            color: "white",
            py: 3,
            px: 4,
            textAlign: "center",
          }}
        >
          <Typography variant="h4" fontWeight="bold" sx={{ mb: 1 }}>
            PaintMe
          </Typography>
          <Typography variant="body1">{mode === "login" ? "ברוכים השבים!" : "הצטרפו אלינו!"}</Typography>
        </Box>

        <Tabs
          value={mode}
          onChange={handleModeChange}
          variant="fullWidth"
          sx={{
            bgcolor: "background.paper",
            "& .MuiTab-root": {
              py: 2,
              fontSize: "1rem",
              fontWeight: 600,
              transition: "all 0.2s",
            },
            "& .Mui-selected": {
              color: "primary.main",
            },
            "& .MuiTabs-indicator": {
              height: 3,
              borderRadius: "3px 3px 0 0",
            },
          }}
        >
          <Tab label="התחברות" value="login" />
          <Tab label="הרשמה" value="register" />
        </Tabs>

        <Box sx={{ p: 4 }}>
          {error && (
            <Alert severity="error" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setError(null)}>
              {error}
            </Alert>
          )}

          {success && (
            <Alert severity="success" sx={{ mb: 3, borderRadius: 2 }} onClose={() => setSuccess(null)}>
              {success}
            </Alert>
          )}

          <Button
            fullWidth
            variant="outlined"
            startIcon={<Google />}
            onClick={handleGoogleAuth}
            disabled={loading}
            aria-label={`${mode === "login" ? "התחברות" : "הרשמה"} עם Google`}
            sx={{
              mb: 3,
              py: 1.2,
              borderRadius: 2,
              borderColor: "#ddd",
              color: "#444",
              backgroundColor: "#fff",
              textTransform: "none",
              fontSize: "1rem",
              fontWeight: 500,
              boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
              "&:hover": {
                backgroundColor: "#f8f8f8",
                borderColor: "#ccc",
              },
            }}
          >
            {mode === "login" ? "התחברות עם Google" : "הרשמה עם Google"}
          </Button>

          <Divider sx={{ my: 3 }}>
            <Typography variant="body2" color="text.secondary">
              או
            </Typography>
          </Divider>

          <form onSubmit={handleSubmit} noValidate>
            <TextField
              fullWidth
              label="אימייל"
              type="email"
              inputRef={emailRef}
              required
              autoComplete="email"
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Email color="action" />
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 3,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            <TextField
              fullWidth
              label="סיסמה"
              type={showPassword ? "text" : "password"}
              inputRef={passwordRef}
              required
              autoComplete={mode === "login" ? "current-password" : "new-password"}
              InputProps={{
                startAdornment: (
                  <InputAdornment position="start">
                    <Lock color="action" />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label={showPassword ? "הסתר סיסמה" : "הצג סיסמה"}
                      onClick={() => setShowPassword(!showPassword)}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
              sx={{
                mb: 1,
                "& .MuiOutlinedInput-root": {
                  borderRadius: 2,
                },
              }}
            />

            {mode === "register" && (
              <FormHelperText sx={{ mb: 3, mr: 1.5 }}>הסיסמה חייבת להכיל לפחות 6 תווים</FormHelperText>
            )}

            {/* {mode === "login" && (
              <Box sx={{ mb: 3, textAlign: "end" }}>
                <Link href="#" underline="hover" variant="body2" color="primary" sx={{ cursor: "pointer" }}>
                  שכחת סיסמה?
                </Link>
              </Box>
            )} */}

            <Button
              type="submit"
              fullWidth
              variant="contained"
              disabled={loading}
              sx={{
                py: 1.5,
                borderRadius: 2,
                fontSize: "1rem",
                fontWeight: 600,
                textTransform: "none",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
                position: "relative",
              }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : mode === "login" ? "התחברות" : "הרשמה"}
            </Button>
          </form>
        </Box>
      </Paper>
    </Box>
  )
}
