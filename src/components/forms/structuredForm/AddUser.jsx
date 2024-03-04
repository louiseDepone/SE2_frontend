import role from "../../../assets/role.png";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import React, { useEffect, useRef, useState } from "react";
import profile from "../../../assets/profile.png";
import lock from "../../../assets/lock.png";
import num from "../../../assets/num.png";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

  const passwordValidationRules = [
    (value) => ({
      message: "At least 8 characters",
      status: value.length >= 8,
    }),
    (value) => ({
      message: "At most 15 characters",
      status: value.length <= 15,
    }),
    (value) => ({
      message: "At least one lowercase letter",
      status: /[a-z]/.test(value),
    }),
    (value) => ({
      message: "At least one uppercase letter",
      status: /[A-Z]/.test(value),
    }),
    (value) => ({ message: "At least one digit", status: /\d/.test(value) }),
    (value) => ({
      message: "At least one special character",
      status: /[@$!%*?&]/.test(value),
    }),
  ];

const strongPasswordRegex =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;

const formSchema = z
  .object({
    idNumber: z.string().refine((value) => /^[0-9]{10}$/.test(value), {
      message:
        "ID Number must be 10 digits with no space, special character, or letter.",
    }),
    employeeName: z.string().refine(
      (value) => {
        const nameParts = value.split(" ");
        return (
          nameParts.length === 2 &&
          nameParts.every((part) => part.length >= 2 && part.length <= 25)
        );
      },
      {
        message:
          "Invalid employee name. Please provide both first name and last name.",
      }
    ),
    role: z.string()
    .refine((value) => ['Shift Manager', 'Admin'].includes(value), {
      message: 'Role must be either "shift manager" or "admin".',
    })
    .refine((value) => value.trim().length > 0, {
      message: 'Role is required.',
    }),
    password: z.string().refine(
      (value) => {
        return passwordValidationRules.every((rule) => rule(value).status);
      },
      {
        message:
          "Password must be 8 to 15 characters long and include at least one uppercase letter, one lowercase letter, one digit, and one special character (@$!%*?&).",
      }
    ),
    confirmPassword: z.string().min(2).max(50),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

import axios from "axios";
import { useAdminContext, useRoleContext } from "@/hooks/useAllContext";

export default function AddUser(props) {
  const {
    roles: { getrole, roleLoading, deleterole, Editrole },
  } = useRoleContext();
  const {
    users: {
      EditUser,
      deleteUser,
      getuser,
      registerUser,
      userLoading,
      userrefetch,
    },
  } = useAdminContext();

  const submitbttn = useRef();
  const forms = useRef();

  const acc = (props.account && {
    idNumber: props.account.id_number,
    employeeName: props.account.name,
    role: props.account.role_name,
    password: props.type === "Delete" ? props.account.id_number : "",
  }) || {
    idNumber: "",
    employeeName: "",
    role: "",
    password: "",
  };

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: (props.account && {
      idNumber: props.account.id_number,
      employeeName: props.account.name,
      role: props.account.role_name,
      password: props.type === "Delete" ? props.account.id_number : "",
    }) || {
      idNumber: "",
      employeeName: "",
      role: "",
      password: "",
    },
  });

  const [fields, setField] = useState(
    (props.account && {
      idNumber: props.account.id_number,
      employeeName: props.account.name,
      role: props.account.role_name,
      password: props.type === "Delete" ? props.account.id_number : "",
    }) || {
      idNumber: "",
      employeeName: "",
      role: "",
      password: "",
    }
  );



  const [disable, setdisable] = useState(true);
  const [valid, setvalid] = useState(
    passwordValidationRules.map((rule) => rule(fields.password))
  );
  useEffect(() => {
    setdisable(
      JSON.stringify(fields) === JSON.stringify(form.formState.defaultValues)
    );
    setvalid(passwordValidationRules.map((rule) => rule(fields.password)));
  }, [fields]);

  function onSubmit(values) {
    const adminRole = getrole?.roles.find(
      (role) => role.role_name === values.role
    );
    if (props.type === "Add") {
      registerUser({
        name: values.employeeName,
        id_number: values.idNumber,
        password: values.password,
        role_id: adminRole.role_id,
      });
    }
    if (props.type === "Modify") {
      EditUser(props.account.user_id, {
        name: values.employeeName,
        id_number: values.idNumber,
        password: values.password,
        role_id: adminRole.role_id,
      });
    }
    if (props.type === "Delete") {
      deleteUser(props.account.user_id);
    }
    console.log("submmitter");
    submitbttn.current.parentNode.parentNode.parentNode.classList.replace(
      "fixed",
      "hidden"
    );
    submitbttn.current.parentNode.parentNode.parentNode.previousSibling.classList.replace(
      "fixed",
      "hidden"
    );
  }

  return (
    <Form {...form}>
      <form
        ref={forms}
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-3 w-[1/2] h-[1/2]"
      >
        <div className="flex justify-between w-full font-normal ">
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem className="w-1/2">
                <FormLabel className="font-normal">Role</FormLabel>

                <FormControl>
                  <div className="flex items-center">
                    {props.type != "Add" ? (
                      <Select
                        disabled
                        onValueChange={field.onChange}
                        defaultValue={field.value.role_id}
                        value={field.value.role_id}
                      >
                        <SelectTrigger>
                          <div className="flex">
                            <img src={role} className="pr-2 w-8" />

                            <SelectValue placeholder={field.value || "Role"} />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {getrole?.roles.map((rol, index) => {
                            return (
                              <SelectItem
                                key={index.toString()}
                                value={rol.role_name}
                              >
                                {rol.role_name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    ) : (
                      <Select
                        onValueChange={field.onChange}
                        defaultValue={field.value.role_id}
                        value={field.value.role_id}
                      >
                        <SelectTrigger>
                          <div className="flex">
                            <img src={role} className="pr-2 w-8" />

                            <SelectValue placeholder={field.value || "Role"} />
                          </div>
                        </SelectTrigger>
                        <SelectContent>
                          {getrole?.roles.map((rol, index) => {
                            return (
                              <SelectItem
                                key={index.toString()}
                                value={rol.role_name}
                              >
                                {rol.role_name}
                              </SelectItem>
                            );
                          })}
                        </SelectContent>
                      </Select>
                    )}
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="w-4"></div>
          <FormField
            control={form.control}
            name="idNumber"
            render={({ field }) => (
              <FormItem
                className=" w-1/2"
                onChange={(e) => {
                  setField({ ...fields, idNumber: e.target.value });
                }}
              >
                <FormLabel className="font-normal"> ID Number</FormLabel>
                <div className="flex items-center  h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50">
                  <img src={num} className="w-6" /> {/*icon*/}
                  <FormControl>
                    {props.type == "Delete" ? (
                      <Input
                        disabled
                        placeholder="e.g 12-594"
                        {...field}
                        className="border-0 border-transparent outline-none ring-0 ring-opacity-0 focus-visible:ring-0 shadow-none border-none ring-none h-full "
                      />
                    ) : (
                      <Input
                        placeholder="e.g 12-594"
                        {...field}
                        className="border-0 border-transparent outline-none ring-0 ring-opacity-0 focus-visible:ring-0 shadow-none border-none ring-none h-full"
                      />
                    )}
                  </FormControl>
                </div>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="employeeName"
          render={({ field }) => (
            <FormItem
              className=" p-0 m-0"
              onChange={(e) => {
                setField({ ...fields, employeeName: e.target.value });
              }}
            >
              <FormLabel className="font-normal">Name</FormLabel>
              <div className="flex items-center  h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ">
                <img src={profile} className="w-6" /> {/*icon*/}
                <FormControl>
                  {props.type == "Delete" ? (
                    <Input
                      disabled
                      placeholder="Enter Name"
                      {...field}
                      className="border-0 border-transparent ring-0 ring-opacity-0 focus-visible:ring-0 shadow-none border-none outline-none ring-none h-full"
                    />
                  ) : (
                    <Input
                      placeholder="Enter Name"
                      {...field}
                      className="border-0 border-transparent outline-none ring-0 ring-opacity-0 focus-visible:ring-0 shadow-none border-none  ring-none h-full"
                    />
                  )}
                </FormControl>
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="password"
          render={({ field }) => (
            <FormItem
              onChange={(e) => {
                setField({ ...fields, password: e.target.value });
              }}
            >
              <FormLabel className="font-normal">Password</FormLabel>
              <div className="flex items-center  h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ">
                <img src={lock} className="w-6" /> {/*icon*/}
                <FormControl>
                  {props.type == "Delete" ? (
                    <Input
                      placeholder="Enter a Password"
                      {...field}
                      type="password"
                      disabled
                      className="border-0 border-transparent outline-none ring-0 ring-opacity-0 focus-visible:ring-0 shadow-none border-none ring-none h-full"
                    />
                  ) : (
                    <Input
                      placeholder="Enter a Password"
                      {...field}
                      type="password"
                      className="border-0 border-transparent ring-0 ring-opacity-0 focus-visible:ring-0 shadow-none border-none outline-none ring-none h-full"
                    />
                  )}
                </FormControl>
              </div>
              <div className="text-xs">
                {valid.map((val, index) => {
                  return (
                    <div
                      className={`${
                        val.status ? " text-green-500 " : " text-red-500 "
                      }  `}
                    >
                      {val.message}
                    </div>
                  );
                })}
              </div>
              {/* <FormMessage /> */}
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="confirmPassword"
          render={({ field }) => (
            <FormItem>
              {props.type == "Delete" ? (
                <FormLabel className="font-normal">
                  Enter the User ID number
                </FormLabel>
              ) : (
                <FormLabel className="font-normal">Confirm Password</FormLabel>
              )}
              <div className="flex items-center  h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 ">
                <img src={lock} className="w-6" /> {/*icon*/}
                <FormControl>
                  <Input
                    placeholder="Confirm Password"
                    {...field}
                    type="password"
                    className="border-0 border-transparent outline-none ring-0 ring-opacity-0 focus-visible:ring-0 shadow-none border-none ring-none h-full"
                  />
                </FormControl>
              </div>
            </FormItem>
          )}
        />
        <div></div>
        {props.type !== "Add" && (
          <Button
            type="button"
            onClick={() => {
              form.setValue("employeeName", acc.employeeName);
              form.setValue("idNumber", acc.idNumber);
              form.setValue("password", acc.password);
              setdisable(true);
            }}
            className="w-full py-4 text-xs bg-red-500"
          >
            Reset
          </Button>
        )}
        {props.type == "Delete" ? (
          <Button
            type="submit"
            ref={submitbttn}
            className="w-full py-4 bg-red-500 text-xs"
          >
            {props.type}
          </Button>
        ) : (
          <Button
            type="submit"
            ref={submitbttn}
            disabled={props.type === "Add" ? false : disable}
            className="w-full py-4 text-xs bg-green-500"
          >
            {props.type}
          </Button>
        )}
      </form>
    </Form>
  );
}
