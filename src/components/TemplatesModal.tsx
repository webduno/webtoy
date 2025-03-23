interface Template {
  name: string;
  description: string;
}

interface TemplatesModalProps {
  templates: Template[];
  onLoadTemplate: (templateName: string) => void;
  onClose: () => void;
}

export default function TemplatesModal({
  templates,
  onLoadTemplate,
  onClose
}: TemplatesModalProps) {
  return (
    <div className='gap-1 pos-abs flex-col flex-align-center z-1000 bg-b-90 pa-4 bord-r-10'>
      {templates.map((template, index) => (
        <button 
          key={index}
          onClick={() => onLoadTemplate(template.name)}
          className='noborder flex-col bg-trans tx-white tx-lg py-1 opaci-chov--50 tx-shadow-5 tx-altfont-1 bg-b-20 bord-r-10'
        >
          {template.name}
          <span className='tx-sm opaci-50 ml-2 nodeco'>{template.description}</span>
        </button>
      ))}
      <button 
        onClick={onClose}
        className='noborder border-white bord-r-15 bg-trans tx-white tx-lg mt-3 py-2 opaci-chov--50 tx-shadow-5 tx-altfont-1'
      >
        Close Templates
      </button> 
    </div>
  );
} 