import { Control, Controller } from 'react-hook-form';
import { TypeValidationAmbulatory } from '../../services/zodschemas';
import Body from '../svg/body';
import { BodyPart } from '../../types/typesRegisters';

type Circles = Record<
  BodyPart,
  { x: number; y: number; width: number; height: number }
>;
const InputPartsOfBody = ({
  control,
}: {
  control: Control<TypeValidationAmbulatory>;
}) => {
  return (
    <label className=' flex flex-col font-medium text-sm gap-1'>
      Selecione as partes do corpo atingida:
      <Controller
        name='parteDoCorpoAtingida'
        control={control}
        render={({ field }) => {
          const bodyParts = field.value || [];
          const circles: Circles = {
            cabeça: { x: 100.5, y: 300, width: 24, height: 21 },
            olhos: { x: 30, y: 7, width: 23, height: 8 },
            'mão esquerda': { x: 42, y: 49, width: 30, height: 30 },
            'mão direita': { x: 5, y: 49, width: 30, height: 30 },
            'pé esquerdo': { x: 32, y: 95, width: 30, height: 30 },
            'pé direito': { x: 16, y: 95, width: 30, height: 30 },
            tronco: { x: 14, y: 18, width: 45, height: 90 },
            'braço esquerdo': { x: 33, y: 22, width: 20, height: 70 },
            'braço direito': { x: 6, y: 22, width: 20, height: 70 },
          };
          return (
            <div className='  w-full max-w-sm mx-auto'>
              {/* <Body /> */}
              {[
                'olhos',
                'cabeça',
                'mão direita',
                'mão esquerda',
                'pé direito',
                'pé esquerdo',
                'tronco',
                'braço direito',
                'braço esquerdo',
              ].map((part) => (
                <label key={part} className=' flex items-center w-1/2 gap-2'>
                  <input
                    // style={{
                    //   right: `${circles[part as BodyPart].x}%`,
                    //   top: `${circles[part as BodyPart].y}%`,
                    //   width: circles[part as BodyPart].width,
                    //   height: circles[part as BodyPart].height,
                    // }}
                    type='checkbox'
                    value={part}
                    checked={bodyParts.includes(part)}
                    onChange={(e) => {
                      const { checked, value } = e.target;
                      if (checked) {
                        field.onChange([...bodyParts, value]);
                      } else {
                        field.onChange(
                          bodyParts.filter((item) => item !== value)
                        );
                      }
                    }}
                  />
                  {part}
                </label>
              ))}
            </div>
          );
        }}
      />
    </label>
  );
};

export default InputPartsOfBody;
