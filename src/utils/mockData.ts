import { nanoid } from 'nanoid'
import { Character, Template, Config, MultiLangText } from '@/types'

// 创建多语言文本的工具函数
const createMultiLangText = (zh: string, en: string, ar: string): MultiLangText => ({
  zh,
  en,
  ar
})

// 生成模拟AI角色数据
export const generateMockCharacters = (): Character[] => {
  return [
    {
      id: nanoid(),
      botId: `bot_${nanoid()}`,
      avatar: 'https://images.unsplash.com/photo-1494790108755-2616b612b742?w=150&h=150&fit=crop&crop=face',
      gender: 'female' as const,
      age: 25,
      permission: 'public' as const,
      nickname: createMultiLangText('小雅助手', 'Xiaoya Assistant', 'مساعد شياويا'),
      region: createMultiLangText('北京', 'Beijing', 'بكين'),
      profession: createMultiLangText('AI助手', 'AI Assistant', 'مساعد ذكي'),
      introduction: createMultiLangText(
        '我是小雅，一个友善的AI助手，可以帮助您解答问题和提供建议。',
        'I am Xiaoya, a friendly AI assistant who can help answer questions and provide advice.',
        'أنا شياويا، مساعد ذكي ودود يمكنني مساعدتك في الإجابة على الأسئلة وتقديم النصائح.'
      ),
      tags: {
        zh: ['友善', '专业', '高效'],
        en: ['Friendly', 'Professional', 'Efficient'],
        ar: ['ودود', 'محترف', 'فعال']
      },
      greeting: createMultiLangText(
        '你好！我是小雅，很高兴为您服务！有什么可以帮助您的吗？',
        'Hello! I am Xiaoya, nice to serve you! How can I help you?',
        'مرحبا! أنا شياويا، من دواعي سروري خدمتك! كيف يمكنني مساعدتك؟'
      ),
      displayImages: [
        'https://images.unsplash.com/photo-1494790108755-2616b612b742?w=300&h=400&fit=crop',
        'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=300&h=400&fit=crop'
      ],
      systemPrompt: 'You are Xiaoya, a helpful and friendly AI assistant. Always be polite, professional, and try your best to help users with their questions.',
      whitelist: ['13800138000', '13900139000'],
      createdAt: new Date('2024-01-15').toISOString(),
      updatedAt: new Date('2024-01-20').toISOString(),
    },
    {
      id: nanoid(),
      botId: `bot_${nanoid()}`,
      avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      gender: 'male' as const,
      age: 30,
      permission: 'private' as const,
      nickname: createMultiLangText('技术专家Tom', 'Tech Expert Tom', 'خبير التكنولوجيا توم'),
      region: createMultiLangText('上海', 'Shanghai', 'شنغهاي'),
      profession: createMultiLangText('技术顾问', 'Technical Consultant', 'مستشار تقني'),
      introduction: createMultiLangText(
        '我是Tom，专注于技术领域的AI助手，擅长编程、架构设计和技术咨询。',
        'I am Tom, an AI assistant focused on technology, specializing in programming, architecture design, and technical consulting.',
        'أنا توم، مساعد ذكي يركز على التكنولوجيا، متخصص في البرمجة وتصميم البنية التحتية والاستشارات التقنية.'
      ),
      tags: {
        zh: ['技术', '编程', '架构', '专业'],
        en: ['Technology', 'Programming', 'Architecture', 'Professional'],
        ar: ['تكنولوجيا', 'برمجة', 'هندسة معمارية', 'محترف']
      },
      greeting: createMultiLangText(
        '您好！我是Tom，您的技术顾问。有什么技术问题需要探讨吗？',
        'Hello! I am Tom, your technical consultant. Any technical questions to discuss?',
        'مرحبا! أنا توم، مستشارك التقني. هل لديك أي أسئلة تقنية للمناقشة؟'
      ),
      displayImages: [
        'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=300&h=400&fit=crop',
        'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=300&h=400&fit=crop'
      ],
      systemPrompt: 'You are Tom, a technical expert AI assistant. You specialize in programming, software architecture, and providing technical solutions. Be precise, helpful, and professional.',
      whitelist: ['13700137000', '13600136000', '13500135000'],
      createdAt: new Date('2024-01-10').toISOString(),
      updatedAt: new Date('2024-01-18').toISOString(),
    },
    {
      id: nanoid(),
      botId: `bot_${nanoid()}`,
      avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      gender: 'female' as const,
      age: 28,
      permission: 'public' as const,
      nickname: createMultiLangText('创意设计师Lily', 'Creative Designer Lily', 'المصممة الإبداعية ليلي'),
      region: createMultiLangText('深圳', 'Shenzhen', 'شنتشن'),
      profession: createMultiLangText('UI/UX设计师', 'UI/UX Designer', 'مصمم واجهة المستخدم'),
      introduction: createMultiLangText(
        '我是Lily，专业的UI/UX设计师，热爱创意设计，可以为您提供设计建议和创意灵感。',
        'I am Lily, a professional UI/UX designer who loves creative design and can provide design advice and creative inspiration.',
        'أنا ليلي، مصممة واجهة مستخدم محترفة أحب التصميم الإبداعي ويمكنني تقديم نصائح التصميم والإلهام الإبداعي.'
      ),
      tags: {
        zh: ['创意', '设计', '美学', '用户体验'],
        en: ['Creative', 'Design', 'Aesthetic', 'User Experience'],
        ar: ['إبداعي', 'تصميم', 'جمالي', 'تجربة المستخدم']
      },
      greeting: createMultiLangText(
        '嗨！我是Lily，让我们一起创造美好的设计吧！有什么设计需求吗？',
        'Hi! I am Lily, let\'s create beautiful designs together! Any design needs?',
        'مرحبا! أنا ليلي، دعونا ننشئ تصاميم جميلة معا! هل لديك أي احتياجات تصميمية؟'
      ),
      displayImages: [
        'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=300&h=400&fit=crop',
        'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=300&h=400&fit=crop'
      ],
      systemPrompt: 'You are Lily, a creative UI/UX designer AI assistant. You are passionate about design, aesthetics, and user experience. Provide creative and practical design advice.',
      whitelist: [],
      createdAt: new Date('2024-01-12').toISOString(),
      updatedAt: new Date('2024-01-22').toISOString(),
    }
  ]
}

// 生成模拟模板数据
export const generateMockTemplates = (): Template[] => {
  return [
    {
      id: nanoid(),
      name: createMultiLangText('欢迎消息模板', 'Welcome Message Template', 'قالب رسالة الترحيب'),
      description: createMultiLangText(
        '用于新用户的欢迎消息模板',
        'Welcome message template for new users',
        'قالب رسالة ترحيب للمستخدمين الجدد'
      ),
      content: createMultiLangText(
        '欢迎来到我们的平台！我们很高兴您的加入。如果您有任何问题，请随时联系我们。',
        'Welcome to our platform! We are glad to have you join us. If you have any questions, please feel free to contact us.',
        'مرحبا بك في منصتنا! نحن سعداء لانضمامك إلينا. إذا كان لديك أي أسئلة، لا تتردد في الاتصال بنا.'
      ),
      category: 'welcome',
      isActive: true,
      createdAt: new Date('2024-01-08').toISOString(),
      updatedAt: new Date('2024-01-15').toISOString(),
    },
    {
      id: nanoid(),
      name: createMultiLangText('技术支持模板', 'Technical Support Template', 'قالب الدعم التقني'),
      description: createMultiLangText(
        '技术支持相关的回复模板',
        'Reply template for technical support',
        'قالب الرد للدعم التقني'
      ),
      content: createMultiLangText(
        '感谢您的反馈。我们的技术团队正在处理您的问题，预计在24小时内给您回复。',
        'Thank you for your feedback. Our technical team is working on your issue and we expect to reply within 24 hours.',
        'شكرا لك على ملاحظاتك. فريقنا التقني يعمل على مشكلتك ونتوقع الرد خلال 24 ساعة.'
      ),
      category: 'support',
      isActive: true,
      createdAt: new Date('2024-01-10').toISOString(),
      updatedAt: new Date('2024-01-12').toISOString(),
    },
    {
      id: nanoid(),
      name: createMultiLangText('产品介绍模板', 'Product Introduction Template', 'قالب تقديم المنتج'),
      description: createMultiLangText(
        '用于介绍产品功能的模板',
        'Template for introducing product features',
        'قالب لتقديم ميزات المنتج'
      ),
      content: createMultiLangText(
        '我们的产品具有以下特点：1. 智能化操作 2. 高效性能 3. 用户友好界面 4. 安全可靠',
        'Our product has the following features: 1. Intelligent operation 2. High efficiency 3. User-friendly interface 4. Safe and reliable',
        'منتجنا له الميزات التالية: 1. تشغيل ذكي 2. كفاءة عالية 3. واجهة سهلة الاستخدام 4. آمن وموثوق'
      ),
      category: 'product',
      isActive: false,
      createdAt: new Date('2024-01-05').toISOString(),
      updatedAt: new Date('2024-01-20').toISOString(),
    }
  ]
}

// 生成模拟配置数据
export const generateMockConfig = (): Config => {
  return {
    defaultAvatars: [
      'https://images.unsplash.com/photo-1494790108755-2616b612b742?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&h=150&fit=crop&crop=face',
      'https://images.unsplash.com/photo-1560250097-0b93528c311a?w=150&h=150&fit=crop&crop=face'
    ]
  }
} 