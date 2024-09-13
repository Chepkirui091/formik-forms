import { useFormik } from "formik";
import { Alert, Button, Grid, Typography } from "@mui/material";
import DMTTextInput from "@/components/@shared-components/forms/text-input";
import * as Yup from "yup";
import Box from "@mui/material/Box";
import FormControlLabel from "@mui/material/FormControlLabel";
import Checkbox from "@mui/material/Checkbox";
import NextLink from "next/link";
import Collapse from "@mui/material/Collapse";
import { useRouter } from "next/router";

const MainForm = () => {
    const router = useRouter();

    const handleOnSubmit = async (values) => {
        try{
            const formData = {
                email : values.email,
                password: values.password,
            }
            const res = await authApi.Login(formData);
            if (res.data.accessToken){
                await login(res.data)
                // await router.push('/dashboard')
            }
        }
        catch (e) {
            console.log(e.message)
        }
    }

    const formik = useFormik({
        initialValues: {
            email: "",
            password: "",
            rememberMe: false,
            submit: null,
        },
        validationSchema: Yup.object().shape({
            email: Yup.string()
                .email("Invalid Email Provided!")
                .required("Email is required!"),
            password: Yup.string().required("Password is required!"),
        }),
        onSubmit: handleOnSubmit
    });

    const handleOnChange = (e) => {
        const { name, value } = e.target;
        formik.setFieldValue(name, sanitizeString(value));
    };

    const handleToggle = (e) => {
        formik.setFieldValue("rememberMe", e.target.checked);
    };


    return (
        <>
            <Box
                sx={{
                    backgroundColor: "background.paper",
                    borderRadius: 2,
                    boxShadow: 5,
                    p: 4,
                }}
                component={"form"}
                onSubmit={formik.handleSubmit}
            >
                <Grid container spacing={2}>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Typography variant={"h5"} align={"center"} gutterBottom>
                            {"Welcome Back"}
                        </Typography>
                        <Typography variant={"body2"} align={"center"} gutterBottom>
                            {"Sign in to your account"}
                        </Typography>
                        <Collapse in={Boolean(formik.errors.submit)}>
                            {Boolean(formik.errors.submit) && (
                                <Alert severity={"error"} variant={"standard"}>
                                    {formik.errors.submit}
                                </Alert>
                            )}
                        </Collapse>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <DMTTextInput
                            label={"Login ID"}
                            fullWidth={true}
                            autoFocus={true}
                            value={formik.values.email}
                            name="email"
                            type={"email"}
                            placeholer={"Enter your login ID..."}
                            error={Boolean(formik.touched.email && formik.errors.email)}
                            helperText={formik.touched.email && formik.errors.email}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <DMTPasswordInput
                            label={"Password"}
                            fullWidth
                            value={formik.values.password}
                            name="password"
                            placeholer={"Enter your password..."}
                            error={Boolean(formik.touched.password && formik.errors.password)}
                            helperText={formik.touched.password && formik.errors.password}
                            onChange={handleOnChange}
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <FormControlLabel
                            label="Remember Me"
                            control={
                                <Checkbox
                                    checked={formik.values.rememberMe}
                                    onChange={handleToggle}
                                    inputProps={{ "aria-label": "controlled" }}
                                />
                            }
                        />
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <Button
                            type={"submit"}
                            variant={"contained"}
                            color={"primary"}
                            fullWidth={true}
                        >
                            {"Login"}
                        </Button>
                    </Grid>
                    <Grid item xs={12} sm={12} md={12} lg={12}>
                        <NextLink href={"/"}>
                            <Button variant={"text"} color={"primary"} fullWidth={true}>
                                {"Forgot Password"}
                            </Button>
                        </NextLink>
                    </Grid>
                </Grid>
            </Box>
        </>
    );
};

export default MainForm;
