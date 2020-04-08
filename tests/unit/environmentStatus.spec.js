import {expect} from "chai";
import {mount} from '@vue/test-utils'
import EnvironmentStatus from "@/components/EnvironmentStatus";
import VChip from "vuetify/lib/components/VChip";
import VSkeletonLoader from "vuetify/lib/components/VSkeletonLoader";

describe('EnvironmentStatus', () => {
  it('shows a successful status', () => {
    let wrapper = mount(EnvironmentStatus, {
      propsData: {
        status: 'success',
        loading: false
      }
    });

    let chip = wrapper.find(VChip);
    expect(chip.isVisible()).to.be.true;
    expect(chip.classes()).to.contain('green');
    expect(chip.text()).to.equal('success');
    expect(wrapper.find(VSkeletonLoader).exists()).to.be.false;
  });

  it('shows a failed status', () => {
    let wrapper = mount(EnvironmentStatus, {
      propsData: {
        status: 'failed',
        loading: false
      }
    });

    let chip = wrapper.find(VChip);
    expect(chip.isVisible()).to.be.true;
    expect(chip.classes()).to.contain('red');
    expect(chip.text()).to.equal('failed');
    expect(wrapper.find(VSkeletonLoader).exists()).to.be.false;
  });

  it('shows an unknown status', () => {
    let wrapper = mount(EnvironmentStatus, {
      propsData: {
        status: 'unknown',
        loading: false
      }
    });

    let chip = wrapper.find(VChip);
    expect(chip.isVisible()).to.be.true;
    expect(chip.classes()).to.contain('gray');
    expect(chip.text()).to.equal('unknown');
    expect(wrapper.find(VSkeletonLoader).exists()).to.be.false;
  });

  it('shows the skeleton if there is no status', () => {
    let wrapper = mount(EnvironmentStatus, {
      propsData: {
        status: '',
        loading: false
      }
    });

    let skeleton = wrapper.find(VSkeletonLoader);
    expect(skeleton.isVisible()).to.be.true;
    expect(skeleton.text()).to.equal('');
    expect(skeleton.vm.boilerplate).to.be.true;
    expect(wrapper.find(VChip).exists()).to.be.false;
  });

  it('shows the loading skeleton if there is no status and it is loading', () => {
    let wrapper = mount(EnvironmentStatus, {
      propsData: {
        status: '',
        loading: true
      }
    });

    let skeleton = wrapper.find(VSkeletonLoader);
    expect(skeleton.isVisible()).to.be.true;
    expect(skeleton.text()).to.equal('');
    expect(skeleton.vm.boilerplate).to.be.false;
    expect(wrapper.find(VChip).exists()).to.be.false;
  });
});
