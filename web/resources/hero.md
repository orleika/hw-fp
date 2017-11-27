%% Powered by mermaid 7.1.0
sequenceDiagram
    participant Your Device
    participant Hardware Information Viewer&Reporter
    participant Web Hardware Fingerprinting Site
    participant Database

    activate Your Device
    Your Device->>Hardware Information Viewer&Reporter: lanuch
    activate Hardware Information Viewer&Reporter
    Hardware Information Viewer&Reporter-->>Your Device: show hw-info
    Hardware Information Viewer&Reporter-xDatabase: report hw-info
    deactivate Hardware Information Viewer&Reporter
    activate Database
    Database-->>Your Device: notify specific fingerprinting site URL
    deactivate Database
    Your Device->>Web Hardware Fingerprinting Site: access (with specific query)
    activate Web Hardware Fingerprinting Site
    Web Hardware Fingerprinting Site->>Database: report hw-fp
    activate Database
    Database-->>Web Hardware Fingerprinting Site: notify complete
    deactivate Database
    Web Hardware Fingerprinting Site-->>Your Device: show thank you
    deactivate Web Hardware Fingerprinting Site
    deactivate Your Device
