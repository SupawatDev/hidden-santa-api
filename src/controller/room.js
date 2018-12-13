import Room from '../models/room';


exports.create = function (req,res) {
    const params = req.params || {};

    Room.create({
        room: params.room,
        key:params.key,
        host:params.host
    }).then(
        user=>{
            res.json(user);
        }
    ).catch(
        err=>{
            res.status(500).send(err);
        }
    );
};