import { useState, useEffect } from "react";

const Script = () => {
  const [scriptData, setScriptData] = useState(null);

  useEffect(() => {
    // Получаем данные из localStorage или используем начальные данные
    const storedData = localStorage.getItem('scriptData');
    if (storedData) {
      setScriptData(JSON.parse(storedData));
    } else {
      const initialData = {
        "status": "ok",
        "data": [
          {
            "category": "Enchant",
            "configData": {
              "id": "Strong Pets",
              "tn": 1
            },
            "value": 4420979661
          },
          {
            "category": "Settings",
            "configData": {
              "id": "Max Level",
              "tn": 2
            },
            "value": 999
          },
          {
            "category": "Items",
            "configData": {
              "id": "Rare Drop",
              "tn": 3
            },
            "value": 1234567890
          }
        ]
      };
      setScriptData(initialData);
    }
  }, []);

  if (!scriptData) {
    return null;
  }

  return (
    <pre style={{ 
      margin: 0, 
      padding: 0, 
      fontFamily: 'monospace',
      fontSize: '14px',
      lineHeight: '1.5',
      whiteSpace: 'pre-wrap',
      wordBreak: 'break-all'
    }}>
      {JSON.stringify(scriptData, null, 2)}
    </pre>
  );
};

export default Script;