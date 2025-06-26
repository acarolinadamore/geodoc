// src/mocks/services/usuarios.js

// ========================================
// DADOS DE USUÁRIOS (inline)
// ========================================
const usuariosData = [
  {
    id: 'user001',
    nome: 'Maria Silva Santos',
    email: 'maria.santos@geodoc.com',
    funcao: 'Analista Financeiro',
    setor: 'FINANCEIRO',
    avatar: null,
    ativo: true,
    created_at: '2025-01-15T08:00:00Z',
    updated_at: '2025-01-15T08:00:00Z',
  },
  {
    id: 'user002',
    nome: 'João Pedro Oliveira',
    email: 'joao.oliveira@geodoc.com',
    funcao: 'Coordenador de Projetos',
    setor: 'PROJETOS',
    avatar: null,
    ativo: true,
    created_at: '2025-01-10T09:30:00Z',
    updated_at: '2025-01-10T09:30:00Z',
  },
  {
    id: 'user003',
    nome: 'Ana Carolina Ferreira',
    email: 'ana.ferreira@geodoc.com',
    funcao: 'Gerente de Qualidade',
    setor: 'QUALIDADE',
    avatar: null,
    ativo: true,
    created_at: '2025-01-05T10:15:00Z',
    updated_at: '2025-01-05T10:15:00Z',
  },
  {
    id: 'user004',
    nome: 'Carlos Eduardo Lima',
    email: 'carlos.lima@geodoc.com',
    funcao: 'Desenvolvedor Senior',
    setor: 'TECNOLOGIA',
    avatar: null,
    ativo: true,
    created_at: '2025-01-20T14:45:00Z',
    updated_at: '2025-01-20T14:45:00Z',
  },
  {
    id: 'user005',
    nome: 'Fernanda Costa Alves',
    email: 'fernanda.alves@geodoc.com',
    funcao: 'Advogada',
    setor: 'JURIDICO',
    avatar: null,
    ativo: true,
    created_at: '2025-01-12T11:20:00Z',
    updated_at: '2025-01-12T11:20:00Z',
  },
  {
    id: 'user006',
    nome: 'Roberto Lima Costa',
    email: 'roberto.costa@geodoc.com',
    funcao: 'Analista Financeiro',
    setor: 'FINANCEIRO',
    avatar: null,
    ativo: true,
    created_at: '2025-01-08T16:30:00Z',
    updated_at: '2025-01-08T16:30:00Z',
  },
  // ✅ USUÁRIOS ADICIONADOS
  {
    id: 'user007',
    nome: 'João Silva',
    email: 'joao.silva@geodoc.com',
    funcao: 'Técnico TI',
    setor: 'TI',
    avatar: null,
    ativo: true,
    created_at: '2025-01-25T09:00:00Z',
    updated_at: '2025-01-25T09:00:00Z',
  },
  {
    id: 'user008',
    nome: 'Patricia Mendes',
    email: 'patricia.mendes@geodoc.com',
    funcao: 'Analista de Processos',
    setor: 'PROCESSOS',
    avatar: null,
    ativo: true,
    created_at: '2025-01-22T11:30:00Z',
    updated_at: '2025-01-22T11:30:00Z',
  },
]

// ========================================
// FUNÇÕES DE SERVIÇO
// ========================================

export function getUsuarios() {
  return new Promise(resolve => {
    setTimeout(() => {
      console.log(
        '👥 Mock Usuarios: Carregando usuários...',
        usuariosData.length
      )
      resolve([...usuariosData])
    }, 200)
  })
}

export function getUsuario(id) {
  return new Promise(resolve => {
    setTimeout(() => {
      const usuario = usuariosData.find(u => u.id === id)
      console.log(
        '👤 Mock Usuarios: Buscando usuário',
        id,
        usuario ? '✅' : '❌'
      )
      resolve(usuario || null)
    }, 150)
  })
}

export function getUsuariosPorSetor(setor) {
  return new Promise(resolve => {
    setTimeout(() => {
      const usuarios = usuariosData.filter(u => u.setor === setor && u.ativo)
      console.log('🏢 Mock Usuarios: Usuários do setor', setor, usuarios.length)
      resolve(usuarios)
    }, 200)
  })
}

// ✅ EXPORT ADICIONAL DO ARRAY DIRETO (para compatibilidade)
export const usuarios = usuariosData

export default {
  getUsuarios,
  getUsuario,
  getUsuariosPorSetor,
  usuarios: usuariosData, // ✅ Disponibilizar o array também
}
