// Spam detection and validation utilities

export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) return false;
  
  // Check for spam patterns
  const spamPatterns = [
    /^[a-z]{1,3}[0-9]{1,3}@/i, // Pattern like abc123@
    /^[a-z]+[0-9]+[a-z]*@/i, // Pattern like test123abc@
    /^[x]{3,}|^([a-z])\1{2,}/i, // Repeated characters like xxx or aaa  
    /jshshsh|abcdefg|qwerty|asdfgh|123456|random|spam|fake/i, // Common spam words
    /^[^a-zA-Z]*@/, // Non-alphabetic start
  ];
  
  return !spamPatterns.some(pattern => pattern.test(email));
};

export const isValidName = (name: string): boolean => {
  if (!name || name.trim().length < 2) return false;
  
  // Check for spam patterns in names
  const spamPatterns = [
    /^[x]{3,}|^([a-z])\1{2,}/i, // Repeated characters like xxxx or aaaa
    /^[0-9]+$/, // Only numbers
    /abcdefg|qwerty|asdfgh|123456|test|spam|fake|random|xyz|abc/i, // Common spam words
    /^[^a-zA-Z\s]/, // Starts with non-letter
    /[^a-zA-Z\s\-\.\']/g, // Contains invalid characters for names
  ];
  
  return !spamPatterns.some(pattern => pattern.test(name));
};

export const isValidPhone = (phone: string): boolean => {
  // Remove all non-numeric characters
  const cleanPhone = phone.replace(/\D/g, '');
  
  // Check for valid length (10-15 digits) and no repeated patterns
  if (cleanPhone.length < 10 || cleanPhone.length > 15) return false;
  
  // Check for spam patterns
  const spamPatterns = [
    /^(.)\1{9,}$/, // All same digits like 1111111111
    /^(12345|98765|11111|00000|99999)/, // Sequential or repeated patterns
    /^0+$/, // All zeros
  ];
  
  return !spamPatterns.some(pattern => pattern.test(cleanPhone));
};

export const validateFormData = (data: {
  name?: string;
  email?: string;
  phone?: string;
}): { isValid: boolean; errors: string[] } => {
  const errors: string[] = [];

  if (data.name && !isValidName(data.name)) {
    errors.push('Please enter a valid name. Avoid random characters or spam entries.');
  }

  if (data.email && !isValidEmail(data.email)) {
    errors.push('Please enter a valid email address. Spam or invalid emails are not accepted.');
  }

  if (data.phone && !isValidPhone(data.phone)) {
    errors.push('Please enter a valid phone number.');
  }

  return {
    isValid: errors.length === 0,
    errors
  };
};