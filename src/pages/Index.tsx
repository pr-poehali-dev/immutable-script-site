import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { toast } from "@/components/ui/use-toast";
import Icon from "@/components/ui/icon";

const Index = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  const scriptData = {
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

  const handleLogin = async () => {
    setIsLoading(true);
    // Simulate authentication
    setTimeout(() => {
      if (password === "admin123") {
        setIsAuthenticated(true);
        toast({
          title: "Успешная авторизация",
          description: "Добро пожаловать в админ-панель",
        });
      } else {
        toast({
          title: "Ошибка авторизации",
          description: "Неверный пароль",
          variant: "destructive",
        });
      }
      setIsLoading(false);
    }, 1000);
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(JSON.stringify(scriptData, null, 2));
      toast({
        title: "Скопировано!",
        description: "JSON-скрипт скопирован в буфер обмена",
      });
    } catch (err) {
      toast({
        title: "Ошибка",
        description: "Не удалось скопировать в буфер обмена",
        variant: "destructive",
      });
    }
  };

  const handleLogout = () => {
    setIsAuthenticated(false);
    setPassword("");
    toast({
      title: "Выход выполнен",
      description: "Вы вышли из системы",
    });
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
        <Card className="w-full max-w-md">
          <CardHeader className="text-center">
            <div className="mx-auto mb-4 w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center">
              <Icon name="Shield" className="w-6 h-6 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-gray-900">Админ-панель</CardTitle>
            <CardDescription className="text-gray-600">
              Введите пароль для доступа к JSON-скриптам
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="password">Пароль</Label>
              <Input
                id="password"
                type="password"
                placeholder="Введите пароль"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                onKeyDown={(e) => e.key === 'Enter' && handleLogin()}
              />
            </div>
            <Button 
              onClick={handleLogin} 
              disabled={isLoading || !password}
              className="w-full bg-blue-600 hover:bg-blue-700"
            >
              {isLoading ? (
                <>
                  <Icon name="Loader2" className="w-4 h-4 mr-2 animate-spin" />
                  Проверка...
                </>
              ) : (
                <>
                  <Icon name="LogIn" className="w-4 h-4 mr-2" />
                  Войти
                </>
              )}
            </Button>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
      <div className="max-w-4xl mx-auto">
        <header className="mb-8">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-blue-600 rounded-lg flex items-center justify-center">
                <Icon name="Code" className="w-5 h-5 text-white" />
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">Админ-панель</h1>
                <p className="text-gray-600">Управление JSON-скриптами</p>
              </div>
            </div>
            <Button 
              onClick={handleLogout}
              variant="outline"
              size="sm"
            >
              <Icon name="LogOut" className="w-4 h-4 mr-2" />
              Выйти
            </Button>
          </div>
        </header>

        <div className="grid gap-6">
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    JSON-скрипт конфигурации
                  </CardTitle>
                  <CardDescription className="text-gray-600">
                    Текущая конфигурация системы (только для чтения)
                  </CardDescription>
                </div>
                <div className="flex items-center space-x-2">
                  <Badge variant="secondary" className="bg-green-100 text-green-800">
                    <Icon name="CheckCircle" className="w-3 h-3 mr-1" />
                    Активно
                  </Badge>
                  <Button onClick={copyToClipboard} size="sm">
                    <Icon name="Copy" className="w-4 h-4 mr-2" />
                    Копировать
                  </Button>
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="relative">
                <pre className="bg-gray-900 text-gray-100 p-4 rounded-lg overflow-x-auto text-sm font-mono">
                  <code>{JSON.stringify(scriptData, null, 2)}</code>
                </pre>
                <div className="absolute top-2 right-2">
                  <Badge variant="outline" className="bg-gray-800 text-gray-300 border-gray-600">
                    JSON
                  </Badge>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid md:grid-cols-3 gap-4">
            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Статус</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <div className="w-2 h-2 bg-green-500 rounded-full"></div>
                  <span className="text-sm text-gray-600">Система активна</span>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Записей</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold text-blue-600">
                  {scriptData.data.length}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-3">
                <CardTitle className="text-lg">Безопасность</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="flex items-center space-x-2">
                  <Icon name="Shield" className="w-4 h-4 text-blue-600" />
                  <span className="text-sm text-gray-600">Защищено</span>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Index;