import Post from "../models/postModel.js";

export const getAllPosts = async (req,res) => {
    const allPosts = await Post.find({})
    
    try{
        if (!allPosts.length) {
            return res.status(404).json({
                response: "Não há posts para listar"
            });
        }

        res.status(200).json(allPosts);
    }
    catch(erro){
       res.status(404).json({
        "response" : "Não foi possível listar os posts"
       })
    }
    
}

export const postPost = async (req, res) => {
  const { title, content, author } = req.body;

  try {
    const newPost = new Post({
      title,
      content,
      author,
      createdAt: Date.now()
    });

    await newPost.save();

    res.status(201).json({
      response: "Post cadastrado com sucesso."
    });
  } catch (erro) {
    res.status(500).json({
      response: "Não foi possível cadastrar o post."
    });
  }
};

export const deletePost = async (req,res, next)=>{
    const id = req.params.id;
    try{
        await Post.findByIdAndDelete(id);
        res.status(201).json({
            "response" : `Post ${id} excluído com sucesso!`
        })
    }catch(erro){
        res.status(400).json({
            "response" : `Erro ao excluir  post ${id} ` 
        })
    }
}


export const erroRoute = (req,res) => {
    const metodo = req.method;
    res.status(400).json({
        "response": `Método ${metodo} não permitido para essa rota.`
    })
}

