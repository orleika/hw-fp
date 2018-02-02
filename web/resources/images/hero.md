%% Powered by mermaid 7.1.0 https://mermaidjs.github.io/mermaid-live-editor/
sequenceDiagram
    participant Device
    participant Hardware Information Report Tool
    participant Hardware Fingerprinting Site
    participant Database

    activate Device
    Device->>Hardware Information Report Tool: launch
    activate Hardware Information Report Tool
    Hardware Information Report Tool-->>Device: show hardware information
    opt obtain informed consent
        Device->>Hardware Information Report Tool: agree with the information providing
        Hardware Information Report Tool->>Database: report hardware information
        deactivate Hardware Information Report Tool
        activate Database
        Database-->>Device: issue a token
        deactivate Database
        Device->>Hardware Fingerprinting Site: access with the token
        activate Hardware Fingerprinting Site
        Hardware Fingerprinting Site-->>Device: fetch hardware fingerprinting scripts
        deactivate Hardware Fingerprinting Site
        Device->>Device: run the hardware fingerprint scripts
        Device->>Database: report hardware fingerprint with the token
        activate Database
        Database-->>Device: notify complete
        deactivate Database
        deactivate Device
    end
