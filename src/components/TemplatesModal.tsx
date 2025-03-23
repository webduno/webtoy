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
    <div className='gap-2 pos-abs flex-col flex-align-center z-1000 bg-b-50 bg-glass-10 pa-4 bord-r-10'>
      {templates.map((template, index) => (
        <button 
          key={index}
          onClick={() => onLoadTemplate(template.name)}
          style={{
            background: "linear-gradient(170deg,#00000000, #00000077, #444444cc)",
          }}
          className='noborder flex-col tx-altfont-1  bg-trans w-250px tx-white tx-lg py-2 opaci-chov--50 tx-shadow-5 tx-altfont-1  bord-r-10'
        >
          {/* {template.name} */}
          <span className='tx-md opaci-  ml-2 nodeco '>{template.description}</span>
        </button>
      ))}
      <button 
        onClick={onClose}
        className='noborder border-white bord-r-10 bg-trans tx-white tx- mt- py-2 opaci-chov--25 opaci-50 tx-shadow-5 tx-altfont-1'
      >
        Close Templates
      </button> 
    </div>
  );
} 