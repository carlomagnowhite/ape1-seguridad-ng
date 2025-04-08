// Interfaz para un nodo del árbol de Huffman
export interface HuffmanNode {
    char: string;
    freq: number;
    left: HuffmanNode | null;
    right: HuffmanNode | null;
  }
  
  export interface CifradoCampo {
    texto_original: string;
    texto_cifrado: string;
    texto_descifrado: string;
    codigos: Record<string, string>;
  }
  
  export interface HuffmanCryptedResponse {
    arboles: {
      email: HuffmanNode;
      lastname: HuffmanNode;
      name: HuffmanNode;
    };
    imagenes: string[];
    usuario: {
      email: CifradoCampo;
      lastname: CifradoCampo;
      name: CifradoCampo;
    };
  }