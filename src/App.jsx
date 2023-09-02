import { Routes, Route } from "react-router-dom";
import { MsalProvider } from "@azure/msal-react";
import { EmployeeList } from "./pages/EmployeeList";
import { ReviewIdeas } from "./pages/ReviewIdeas";

import "./style/App.css";
import { PageLayout } from "./components/PageLayout";
import { CreateIdea } from "./pages/CreateIdea";
import { EmployeeDetails } from "./pages/EmployeeDetails";
import { ConfigProvider, theme } from "antd";
import { USER_SETTINGS, USER_THEMES } from "./config"
import { useState } from "react";
import { PageNotFound } from "./pages/PageNotFound";
import HomePage from "./pages/HomePage";
import AppConfig from "./pages/AppConfig";

export const Pages = () => {
    return (
        <Routes>
            <Route path="/appconfig" element={<AppConfig />} />
            <Route path="/reviewideas" element={<ReviewIdeas />} />
            <Route path="/createidea" element={<CreateIdea />} />
            <Route path="/details" element={<EmployeeDetails />} />
            <Route path="/" element={<HomePage />} />
            <Route path="*" element={<PageNotFound />} />
        </Routes>
    );
};

/**
 * msal-react is built on the React context API and all parts of your app that require authentication must be
 * wrapped in the MsalProvider component. You will first need to initialize an instance of PublicClientApplication
 * then pass this to MsalProvider as a prop. All components underneath MsalProvider will have access to the
 * PublicClientApplication instance via context as well as all hooks and components provided by msal-react. For more, visit:
 * https://github.com/AzureAD/microsoft-authentication-library-for-js/blob/dev/lib/msal-react/docs/getting-started.md
 */
const App = ({ instance }) => {
    
    const [IsDarkTheme, setIsDarkTheme] = useState(USER_SETTINGS.theme === USER_THEMES.Dark);

    const getUserThemeSetting = () => {
        if (IsDarkTheme)
            return getDarkThemeSetting();
        return getLightThemeSetting();
    }

    const getDarkThemeSetting = () => {
        return {
            algorithm: theme.darkAlgorithm,
            token: {
                "fontSize": 12,
                "headerbgc": '#1C1C1C',
                "contentbgc": '#1F1F1F'
            }
        }
    }
    const getLightThemeSetting = () => {
        return {
            algorithm: theme.compactAlgorithm,
            token: {
                "fontSize": 14,
                "headerbgc": '#092e5d',
                "contentbgc": '#F5F5F5'
            }
        }
    }

    return (
        <MsalProvider instance={instance}>
            <ConfigProvider
                theme = {getUserThemeSetting()}
            >
                <PageLayout IsDarkTheme={IsDarkTheme} setIsDarkTheme={setIsDarkTheme}>
                </PageLayout>
            </ConfigProvider>
        </MsalProvider>
    );
};

export default App;
