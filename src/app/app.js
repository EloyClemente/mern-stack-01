import React, { Component } from 'react'


class App extends Component{

    constructor(){
        super()
        this.state = {
            submitValue: 'Enviar',
            title: '',
            description: '',
            tasks: [],
            _id: ''
        }
        this.addTask = this.addTask.bind(this)
        this.handleChange = this.handleChange.bind(this)
        this.fetchTasks = this.fetchTasks.bind(this)
    }



    handleChange(event)
    {
        const { name, value } = event.target
        this.setState({ [name]: value })
    }

    

    addTask(event)
    {
        event.preventDefault()

        if(this.state._id)
        {
            fetch(`/api/tasks/${ this.state._id }`,
            {
                method: 'put',
                body: JSON.stringify(this.state),
                headers: {
                    "Accept": "Application/json",
                    "Content-Type": "Application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({ html: 'Tarea actualizada' })
                this.setState({ submitValue: 'Enviar', title: '', description: '', _id: '' })
                this.fetchTasks()
            })
        }
        else{
            fetch('/api/tasks', 
            { 
                method: 'post',
                body: JSON.stringify(this.state),
                headers: {
                    "Accept": "Application/json",
                    "Content-Type": "Application/json"
                }
            })
            .then(res => res.json())
            .then(data => {
                console.log(data)
                M.toast({ html: 'Tarea guardada' })
                this.setState({ title: '', description: '' })
                this.fetchTasks()
            })
            .catch(err => console.error(err))
        }
    }



    componentDidMount()
    {
        this.fetchTasks()
    }



    fetchTasks()
    {
        fetch('/api/tasks')
        .then(res => res.json())
        .then(data => {
            this.setState({ tasks: data })
        })
    }


    editTask(id)
    {
        fetch(`/api/tasks/${ id }`)
        .then(res => res.json())    
        .then(data => {
            this.setState({
                submitValue: 'Editar',
                title: data.title,
                description: data.description,
                _id: data._id
            })
        })
    }



    deleteTask(id)
    {
        if(confirm('¿Estás seguro de querer eliminar?'))

        fetch(`/api/tasks/${id}`, 
        {
            method: 'delete',
            headers: {
                "Accept": "Application/json",
                "Content-Type": "Application/json"
            }
        })
        .then(res => res.json())
        .then(data => console.log(data))

        M.toast({ html: 'Tarea eliminada' })

        this.fetchTasks()
    }


    

    render(){
        return(
            <div>
                <nav className="light-blue darken-4">
                    <div className="container">
                        <a href="/" className="brand-logo">MERN Stack</a>
                    </div>
                </nav>
                <div className="container">
                    <div className="row">
                        <div className="col s5">
                            <div className="card">
                                <div className="card-content">
                                <form onSubmit={ this.addTask }>
                                    <div className="row">
                                        <div className="input-field cols12">
                                            <input type="text" onChange={ this.handleChange } name="title" value={this.state.title} placeholder="title"/>
                                        </div>
                                    </div>
                                    <div className="row">
                                        <div className="input-field cols12">
                                            <textarea onChange={ this.handleChange } name="description" value={this.state.description} className="materialize-textarea" placeholder="Description"></textarea>
                                        </div>
                                    </div>
                                    <button type="submit" className="btn light-blue darken-4 waves-effect waves-light">{ this.state.submitValue }</button>
                                </form>
                                </div>
                            </div>
                        </div>
                        <div className="col s7">
                            <table>
                                <thead>
                                    <tr>
                                        <th>Title</th>
                                        <th>Description</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {
                                        this.state.tasks.map(task => 
                                        {
                                            return(
                                                <tr key={ task._id }>
                                                    <td>{ task.title }</td>
                                                    <td>{ task.description }</td>
                                                    <td>
                                                        <button onClick={ ()=> this.editTask(task._id) } className="btn-small waves-effect waves-light" style={{ margin: '4px' }}>
                                                            <i className="material-icons">edit</i>
                                                        </button>                  
                                                        <button onClick={ ()=> this.deleteTask(task._id) } className="btn-small red accent-3 waves-effect waves-light">
                                                            <i className="material-icons">delete</i>
                                                        </button>
                                                    </td>
                                                </tr>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

export default App