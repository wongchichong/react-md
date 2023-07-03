import type { ReactElement } from "react";
import { Avatar } from "@react-md/avatar";
import {
  Card,
  CardContent,
  CardTitle,
  CardSubtitle,
  CardHeader,
} from "@react-md/card";
import { Typography } from "@react-md/typography";

import Container from "./Container";

export default function SimpleExample(): Child {
  return (
    <Container>
      <Card>
        <CardHeader>
          <CardTitle>Main Title</CardTitle>
        </CardHeader>
        <CardContent>
          <Typography>
            Duis lacinia lectus sed enim placerat, non consequat arcu tincidunt.
            Pellentesque vel condimentum lorem. Cras et arcu nibh. Cras euismod
            lectus commodo finibus facilisis. Sed ullamcorper odio sed
            scelerisque semper. Donec sollicitudin lorem eget tincidunt
            efficitur. Aenean sit amet tempus lacus, sit amet semper justo. Sed
            quis suscipit ante. Etiam aliquam risus eu laoreet placerat.
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Main Title</CardTitle>
          <CardSubtitle>Subtitle</CardSubtitle>
        </CardHeader>
        <CardContent>
          <Typography>
            Duis pellentesque, ligula vel convallis tincidunt, arcu enim cursus
            leo, sit amet euismod eros tellus vel nisi. Quisque ultrices
            elementum nisi id pulvinar. Vivamus ac posuere mauris, vitae aliquet
            massa. Donec semper vestibulum odio sit amet aliquam. Nullam sed
            pellentesque risus, condimentum vulputate quam. Donec sed lacinia
            nisl. Donec convallis risus a placerat pellentesque.
          </Typography>
        </CardContent>
      </Card>
      <Card>
        <CardHeader beforeChildren={<Avatar>A</Avatar>}>
          <CardTitle>Card Title</CardTitle>
          <CardSubtitle>Card subtitle</CardSubtitle>
        </CardHeader>
        <CardContent>
          <Typography>
            Proin eget lacinia sem. Curabitur viverra, ex ac vulputate
            malesuada, risus justo pharetra lectus, id gravida metus diam et
            nisi. Fusce semper eu magna sit amet interdum. Phasellus fringilla
            in elit auctor sodales. Interdum et malesuada fames ac ante ipsum
            primis in faucibus. Sed facilisis enim ut leo euismod dapibus.
            Curabitur neque urna, ullamcorper ac nibh in, vehicula varius orci.
            Nunc lacinia magna eget dolor eleifend, eu dapibus lacus suscipit.
            Pellentesque sollicitudin mi sagittis magna fringilla luctus sit
            amet quis elit. Vestibulum ante ipsum primis in faucibus orci luctus
            et ultrices posuere cubilia Curae; Cras congue nunc elit, ac commodo
            orci laoreet at. Quisque libero erat, ultricies quis neque ut,
            blandit laoreet nibh. Phasellus sagittis lobortis ipsum, vitae
            maximus quam auctor sit amet. Quisque ut lobortis purus.
          </Typography>
        </CardContent>
      </Card>
      <Card bordered>
        <CardHeader beforeChildren={<Avatar>A</Avatar>}>
          <CardTitle>Bordered Card</CardTitle>
        </CardHeader>
        <CardContent>
          <Typography>
            Maecenas eleifend, ligula rhoncus blandit molestie, magna nulla
            aliquet neque, non efficitur felis mi sed lorem. Suspendisse sed
            pharetra nulla, mattis cursus odio. Proin molestie augue quis
            pharetra euismod. Donec vulputate mattis velit, a pellentesque metus
            consequat in. Duis aliquam vitae magna at aliquam. Pellentesque
            habitant morbi tristique senectus et netus et malesuada fames ac
            turpis egestas. In hac habitasse platea dictumst. Integer facilisis
            vel mauris non lobortis. Cras cursus semper gravida. Morbi a
            scelerisque ante. Aenean sed justo nec justo rutrum pretium. In hac
            habitasse platea dictumst. Proin nibh massa, scelerisque sed mauris
            vel, dictum faucibus tortor. Cras elit eros, scelerisque a accumsan
            eget, vulputate sed nisi.
          </Typography>
        </CardContent>
      </Card>
    </Container>
  );
}
