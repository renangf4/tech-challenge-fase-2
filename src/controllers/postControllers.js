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

export const getPostById = async (req, res) => {
    const id = req.params.id;
    try {
        const post = await Post.findById(id);
        if (!post) {
            return res.status(404).json({
                response: `Post com id ${id} não encontrado.`
            });
        }
        res.status(200).json(post);
    } catch (erro) {
        res.status(400).json({
            response: `Erro ao buscar post com id ${id}.`
        });
    }
}

export const updatePost = async (req, res) => {
    const id = req.params.id;
    const { title, content, author } = req.body;
    try {
        const updatedPost = await Post.findByIdAndUpdate(
            id,
            { title, content, author },
            { new: true, runValidators: true }
        );
        if (!updatedPost) {
            return res.status(404).json({
                response: `Post com id ${id} não encontrado.`
            });
        }
        res.status(200).json({
            response: `Post ${id} atualizado com sucesso!`,
            post: updatedPost
        });
    } catch (erro) {
        res.status(400).json({
            response: `Erro ao atualizar post com id ${id}.`
        });
    }
}

export const searchPosts = async (req, res) => {
    const { title, content, author } = req.query;
    const query = {};
    if (title) query.title = { $regex: title, $options: 'i' };
    if (content) query.content = { $regex: content, $options: 'i' };
    if (author) query.author = { $regex: author, $options: 'i' };
    try {
        const posts = await Post.find(query);
        if (!posts.length) {
            return res.status(404).json({
                response: "Nenhum post encontrado para os critérios de busca."
            });
        }
        res.status(200).json(posts);
    } catch (erro) {
        res.status(400).json({
            response: "Erro ao buscar posts."
        });
    }
}


export const erroRoute = (req,res) => {
    const metodo = req.method;
    res.status(400).json({
        "response": `Método ${metodo} não permitido para essa rota.`
    })
}

