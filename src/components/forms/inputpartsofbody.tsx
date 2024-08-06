import { Control, Controller } from 'react-hook-form';
import { TypeValidationAmbulatory } from '../../services/zodschemas';
import Body from '../svg/body';
import { BodyPart } from '../../types/typesRegisters';

type Circles = Record<
  BodyPart,
  {
    x: number;
    y: number;
    width: number;
    height: number;
    radiusTopRigth: number | null;
    radiusTopLeft: number | null;
  }
>;
const InputPartsOfBody = ({
  control,
}: {
  control: Control<TypeValidationAmbulatory>;
}) => {
  return (
    <label className=' flex flex-col font-medium text-sm gap-1 mb-10 mt-1'>
      Selecione as partes do corpo atingida:
      <Controller
        name='parteDoCorpoAtingida'
        control={control}
        render={({ field }) => {
          const bodyParts = field.value || [];
          const circles: Circles = {
            cabeça: {
              x: 19,
              y: 1,
              width: 25,
              height: 15,
              radiusTopLeft: 50,
              radiusTopRigth: 50,
            },
            olhos: {
              x: 19,
              y: 7,
              width: 23,
              height: 8,
              radiusTopLeft: null,
              radiusTopRigth: null,
            },
            'mão esquerda': {
              x: 38,
              y: 46,
              width: 30,
              height: 30,
              radiusTopLeft: null,
              radiusTopRigth: null,
            },
            'mão direita': {
              x: 0,
              y: 46,
              width: 30,
              height: 30,
              radiusTopLeft: null,
              radiusTopRigth: null,
            },
            'pé esquerdo': {
              x: 27,
              y: 90,
              width: 30,
              height: 30,
              radiusTopLeft: null,
              radiusTopRigth: null,
            },
            'pé direito': {
              x: 10,
              y: 90,
              width: 30,
              height: 30,
              radiusTopLeft: null,
              radiusTopRigth: null,
            },
            tronco: {
              x: 14,
              y: 18,
              width: 45,
              height: 90,
              radiusTopLeft: null,
              radiusTopRigth: null,
            },
            'braço esquerdo': {
              x: 33,
              y: 22,
              width: 20,
              height: 70,
              radiusTopLeft: null,
              radiusTopRigth: null,
            },
            'braço direito': {
              x: 6,
              y: 22,
              width: 20,
              height: 70,
              radiusTopLeft: null,
              radiusTopRigth: null,
            },
          };

          return (
            <div className=' relative w-full max-w-sm mx-auto'>
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
                <label
                  key={part}
                  className={`${
                    bodyParts.find((item) => item === part)
                      ? 'bg-green-400'
                      : 'bg-slate-300'
                  }
                     opacity-70 absolute`}
                  style={{
                    borderTopRightRadius: `${
                      circles[part as BodyPart].radiusTopRigth
                    }%`,
                    borderTopLeftRadius: `${
                      circles[part as BodyPart].radiusTopLeft
                    }%`,
                    left: `${circles[part as BodyPart].x}%`,
                    top: `${circles[part as BodyPart].y}%`,
                    width: circles[part as BodyPart].width,
                    height: circles[part as BodyPart].height,
                  }}
                >
                  <input
                    className=' hidden w-full'
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
                  <p>{bodyParts.find((item) => item === part) ? part : null}</p>
                </label>
              ))}
              <Body />
              {/* <div className=' flex'>
                {bodyParts.map((part) => (
                  <p>{part},</p>
                ))}
              </div> */}
            </div>
          );
        }}
      />
    </label>
  );
};

export default InputPartsOfBody;
