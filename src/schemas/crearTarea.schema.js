import Joi from "joi";
const creartareaSchema = Joi.object({
  Area: Joi.string().alphanum().required(),
  Asignado_a: Joi.string().alphanum().required(),
  Creado_por: Joi.string().alphanum().required(),
  Descripcion: Joi.string().alphanum().required(),
  vistoBueno: Joi.bool(),
  Asignado_a: Joi.string().alphanum().required(),
  Reasignado_a: Joi.string().alphanum().required(),
  Respuesta_resuelto_reasignado: Joi.string().alphanum().required(),
});

export default creartareaSchema;
