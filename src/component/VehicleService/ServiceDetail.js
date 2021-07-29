import React from 'react';
import { Container } from 'react-bootstrap';
import ImageCarousel from '../../asset/commons/carousel/ImageCarousel';
import ServiceDetailCard from './ServiceCommons/ServiceDetailCard';
import ServiceDataService from './ServiceDataService';
class ServiceDetail extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      service: {
        Id: this.props.match.params.id,
        title: '',
        subtitle: '',
        location: '',
        contactNo: '',
        description: '',
        provider: '',
        comment: '',
        status: '',
        category: '',
        image1: null,
        image2: null,
        image3: null,
        currentTime: '',
      },
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    this.getServiceById();
  }
  //r

  getServiceById = () => {
    this.setState({ loading: true });
    const { service } = this.state;
    ServiceDataService.getServiceById(service.Id).then((res) => {
      service['title'] = res.data.title;
      service['subtitle'] = res.data.subTitle;
      service['description'] = res.data.description;
      service['location'] = res.data.location;
      service['category'] = res.data.category;
      service['provider'] = res.data.serviceProvider;
      service['image1'] = res.data.image1;
      service['image2'] = res.data.image2;
      service['image3'] = res.data.image3;
      service['image3'] = res.data.image3;
      service['comment'] = res.data.comment;
      service['status'] = res.data.status;
      service['currentTime'] = res.data.currentTime;
      this.setState({
        service,
      });
      this.setState({ loading: false });
    });
  };
  render() {
    const {
      title,
      subtitle,
      location,
      contactNo,
      description,
      provider,
      comment,
      status,
      category,
      image1,
      image2,
      image3,
      currentTime,
    } = this.state.service;
    return (
      <Container>
        <ImageCarousel
          image1={image1}
          image2={image2}
          image3={image3}
          title={title}
          subtitle={subtitle}
        />
        <ServiceDetailCard
          title={title}
          subtitle={subtitle}
          location={location}
          contactNo={contactNo}
          description={description}
          provider={provider}
          comment={comment}
          status={status}
        />
      </Container>
    );
  }
}

export default ServiceDetail;
