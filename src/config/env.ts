interface EnvConfig {
  siteUrl: string;
  apiUrl: string;
  environment: 'development' | 'production';
  analyticsId: string;
  googleMapsKey: string;
  financingUrl: string;
  motoDetailUrl: string;
}

const env: EnvConfig = {
  siteUrl: import.meta.env.PUBLIC_SITE_URL || 'http://localhost:3000',
  apiUrl: import.meta.env.PUBLIC_API_URL || 'https://globalgo-api.sis360.com.pe/api/Catalog',
  environment: (import.meta.env.PUBLIC_ENV as 'development' | 'production') || 'development',
  analyticsId: import.meta.env.PUBLIC_ANALYTICS_ID || '',
  googleMapsKey: import.meta.env.PUBLIC_GOOGLE_MAPS_KEY || '',
  financingUrl: import.meta.env.PUBLIC_FINANCING_URL || 'https://staging.globalgo.com.pe/solicitar-financiamiento',
  motoDetailUrl: import.meta.env.PUBLIC_MOTO_DETAIL_URL || 'https://staging.globalgo.com.pe/catalogo',
};

export const isDevelopment = env.environment === 'development';
export const isProduction = env.environment === 'production';

export default env; 