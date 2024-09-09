import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
//import dayjs from "dayjs";
//import utc from "dayjs/plugin/utc";
import { Button } from "../ui/Button.tsx";
import { ButtonLink } from "../ui/ButtonLink.tsx";
import { Card } from "../ui/Card.tsx";
import { usePlace } from "../../context/PlaceContext.tsx";
import { Textarea } from "../ui/Textarea.tsx";
import { useForm } from "react-hook-form";
import Place from "../../interfaces/Place.ts";
import { ObjectId } from "@mikro-orm/mongodb";
//dayjs.extend(utc);

export function PlaceFormPage() {
    const { createPlace, getPlace, updatePlace } = usePlace();
    const navigate = useNavigate();
    const params = useParams();
    const {
        register,
        setValue,
        handleSubmit,
        formState: { errors },
    } = useForm();

    const onSubmit = async (dataPlace: Place) => {
        try {
            if (params.id) {
                updatePlace(dataPlace);
            } else {
                createPlace(dataPlace);
            }

            navigate("/lugares"); //al crear el lugar se redirige al usuario a la pagina de lugares
        } catch (error) {
            console.log(error);
            window.location.href = "/"; //si hay un error se redirige al usuario a la homePage
        }
    };

    useEffect(() => {
        const loadPlace = async () => {
            if (params.id) {
                const id = new ObjectId(params.id);
                const place: Place = await getPlace(id);
                setValue("nombre", place.nombre);
                setValue("latitud", place.ubicacion.latitud);
                setValue("longitud", place.ubicacion.longitud);
                setValue("provincia", place.provincia);
                setValue("pais", place.pais);
                setValue("codigoPostal", place.codigoPostal);;
            }
        };
        loadPlace();
    }, []);

    return (
        <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Label htmlFor="title">Title</Label>
                <Input
                    type="text"
                    name="title"
                    placeholder="Title"
                    {...register("title")}
                    autoFocus
                />
                {errors.title && (
                    <p className="text-red-500 text-xs italic">Please enter a title.</p>
                )}

                <Label htmlFor="description">Description</Label>
                <Textarea
                    name="description"
                    id="description"
                    rows="3"
                    placeholder="Description"
                    {...register("description")}
                ></Textarea>

                <Label htmlFor="date">Date</Label>
                <Input type="date" name="date" {...register("date")} />
                <Button>Save</Button>
            </form>
        </Card>
    );
}