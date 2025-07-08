import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';

export const GoogleAuth = ({ onLogin }) => {
  useEffect(() => {
    // Carregar o script do Google Identity Services
    const script = document.createElement('script');
    script.src = 'https://accounts.google.com/gsi/client';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    script.onload = () => {
      if (window.google) {
        window.google.accounts.id.initialize({
          client_id: '1234567890-abcdefghijklmnopqrstuvwxyz.apps.googleusercontent.com', // Substitua pelo seu Client ID
          callback: handleCredentialResponse,
        });
      }
    };

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleCredentialResponse = (response) => {
    try {
      // Decodificar o JWT token (em produção, faça isso no backend)
      const payload = JSON.parse(atob(response.credential.split('.')[1]));
      
      const user = {
        id: payload.sub,
        name: payload.name,
        email: payload.email,
        picture: payload.picture,
      };

      onLogin(user);
    } catch (error) {
      console.error('Erro ao processar login:', error);
      alert('Erro ao fazer login. Tente novamente.');
    }
  };

  const handleGoogleLogin = () => {
    if (window.google) {
      window.google.accounts.id.prompt();
    } else {
      // Fallback para desenvolvimento - simular login
      const mockUser = {
        id: 'dev-user',
        name: 'Dr. Desenvolvedor',
        email: 'dev@tiopaulo.com',
        picture: 'https://via.placeholder.com/40x40/059669/ffffff?text=TP',
      };
      onLogin(mockUser);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center relative overflow-hidden bg-cover bg-center bg-no-repeat" 
         style={{backgroundImage: 'url(/bg.png)'}}>
      {/* Background overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-emerald-600/80 via-teal-700/80 to-cyan-800/80"></div>
      
      {/* Floating Particles */}
      <div className="floating-particles">
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
        <div className="particle"></div>
      </div>

      <Card className="glass-card w-full max-w-md mx-4 border-white/30">
        <CardHeader className="text-center space-y-4">
          <div className="w-20 h-20 rounded-full flex items-center justify-center overflow-hidden bg-white/10 backdrop-blur-sm border border-white/20 mx-auto">
            <img 
              src="/logo.png" 
              alt="Tio Paulo Logo" 
              className="w-16 h-16 object-contain"
            />
          </div>
          <div>
            <CardTitle className="text-2xl font-bold text-white">Tio Paulo</CardTitle>
            <p className="text-emerald-100 text-sm mt-2">Sistema de Anamnese Odontológica</p>
          </div>
        </CardHeader>
        
        <CardContent className="space-y-6">
          <div className="text-center">
            <p className="text-white/80 text-sm mb-6">
              Faça login com sua conta Google para acessar o sistema
            </p>
            
            <Button
              onClick={handleGoogleLogin}
              className="w-full glass-button bg-white/10 hover:bg-white/20 text-white border border-white/30 flex items-center justify-center space-x-3 py-3"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              <span>Entrar com Google</span>
            </Button>
          </div>
          
          <div className="text-center">
            <p className="text-white/60 text-xs">
              Ao fazer login, você concorda com nossos termos de uso e política de privacidade
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};