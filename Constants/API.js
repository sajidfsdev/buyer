import Constants from "expo-constants";

const { manifest } = Constants;

export default {
    server:`http://${manifest.debuggerHost.split(':').shift()}:3000`
    
};