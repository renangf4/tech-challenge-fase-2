import Notification from "../models/notificationModel.js";

export const getAllNotifications = async (req,res) => {
    const allNotifications = await Notification.find({})
    
    try{
        if (!allNotifications.length) {
            return res.status(404).json({
                response: "Não há notificações para listar"
            });
        }

        res.status(200).json(allNotifications);
    }
    catch(erro){
       res.status(404).json({
        "response" : "Não foi possível listar as notificações"
       })
    }
    
}

export const postNotification = async (req, res) => {
  const { title, description } = req.body;

  try {
    const newNotification = new Notification({
      title,
      description,
      date: Date.now()
    });

    await newNotification.save();

    res.status(201).json({
      response: "Notificação cadastrada com sucesso."
    });
  } catch (erro) {
    res.status(500).json({
      response: "Não foi possível cadastrar a notificação."
    });
  }
};

export const deleteNotification = async (req,res, next)=>{
    const id = req.params.id;
    try{
        await Notification.findByIdAndDelete(id);
        res.status(201).json({
            "response" : `Notificação ${id} excluída com sucesso!`
        })
    }catch(erro){
        res.status(400).json({
            "response" : `Erro ao excluir  notificação ${id} ` 
        })
    }
}


export const erroRoute = (req,res) => {
    const metodo = req.method;
    res.status(400).json({
        "response": `Método ${metodo} não permitido para essa rota.`
    })
}

